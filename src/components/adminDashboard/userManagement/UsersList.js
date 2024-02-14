import {useState, useMemo, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableSortLabel from '@mui/material/TableSortLabel';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import TimerRoundedIcon from '@mui/icons-material/TimerRounded';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import Skeleton from '@mui/material/Skeleton';
import getUsersData from '../../../helper/getUsers';
import EditUser from './EditUser';

const loadingAnimation = () => {
    const skeletons = [];
    for (let i = 0; i < 10; i++) {
        skeletons.push(
            <Typography key={i} variant="h3"><Skeleton/></Typography>
        );
    }
    return (<Box sx={{width: 1}}> {skeletons} </Box>);
}

export default function UsersList({filter}) {

    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isOpenUserEditDrawer, setIsOpenUserEditDrawer] = useState(false);
    const [selectedUser, setSelectedUser] = useState();

    useEffect(() => {
        setFilteredUsers(users.filter(user => {
            for (const property of Object.values(user)) {
                if (typeof property === 'string' && property.toLowerCase().includes(filter.toLowerCase())) {
                    return true;
                }
            }
            return false;
        }));
    }, [filter, users]);

    const [sortBy, setSortBy] = useState('name');      // Hangi stüna göre sıralama yapılacağı , başlangıçta 'name' belirlendi
    const [sortOrder, setSortOrder] = useState('asc'); // Sıralama yöntemi | asc(artan) - dsc(azalan)

    const sortedUsers = useMemo(() => {
        const comparator = (a, b) => {
            if (a[sortBy] < b[sortBy]) return -1;
            if (a[sortBy] > b[sortBy]) return 1;
            return 0;
        };
        return filteredUsers.slice().sort((a, b) => (sortOrder === 'asc' ? comparator(a, b) : -comparator(a, b)));
    }, [filteredUsers, sortBy, sortOrder]);

    const handleSort = (property) => {  // Sıralama yöntemini değiştirir
        const isAsc = sortBy === property && sortOrder === 'asc';
        setSortBy(property);
        setSortOrder(isAsc ? 'desc' : 'asc');
    };


    if (isLoading) {
        setIsLoading(false);
        getUsersData("id name surname phone email permissions mailConfirmation")
            .then(userData => setUsers(userData))
            .catch(error => console.error('Error | fetching users :', error));
    }

    const handleCloseUserEditDrawer = () => {
        setIsOpenUserEditDrawer(false);
    }

    const handleOpenUserEditDrawer = (user) => {
        setIsOpenUserEditDrawer(true);
        setSelectedUser(user);
    }


    return (
        <TableContainer component={Paper}>
            <EditUser user={selectedUser} isOpen={isOpenUserEditDrawer} handleClose={handleCloseUserEditDrawer}/>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <TableSortLabel
                                active={sortBy === 'name'}
                                direction={sortBy === 'name' ? sortOrder : 'asc'}
                                onClick={() => handleSort('name')}
                            >
                                Ad Soyad
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={sortBy === 'phone'}
                                direction={sortBy === 'phone' ? sortOrder : 'asc'}
                                onClick={() => handleSort('phone')}
                            >
                                Telefon
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={sortBy === 'email'}
                                direction={sortBy === 'email' ? sortOrder : 'asc'}
                                onClick={() => handleSort('email')}
                            >
                                E-posta
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={sortBy === 'permissions'}
                                direction={sortBy === 'permissions' ? sortOrder : 'asc'}
                                onClick={() => handleSort('permissions')}
                            >
                                Yetkiler
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{textAlign: 'center'}}>
                            <TableSortLabel
                                active={sortBy === 'mailConfirmation'}
                                direction={sortBy === 'mailConfirmation' ? sortOrder : 'asc'}
                                onClick={() => handleSort('mailConfirmation')}
                            >
                                Mail Onayı
                            </TableSortLabel>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {isLoading ? (
                        <TableRow><TableCell
                            colSpan={100}>{loadingAnimation()}</TableCell></TableRow>) : sortedUsers.map(user => (
                        <TableRow
                            hover={user.mailConfirmation}
                            key={user._id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            onClick={() => handleOpenUserEditDrawer(user)}
                        >
                            <TableCell component="th" scope="row">
                                {`${user.name} ${user.surname}`}
                            </TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.permissions}</TableCell>
                            <TableCell>{user.mailConfirmation ?
                                <DoneRoundedIcon sx={{display: 'flex', margin: 'auto'}} color="primary"/> :
                                <TimerRoundedIcon sx={{display: 'flex', margin: 'auto'}} color="error"/>}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
