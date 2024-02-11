import {useState, useMemo} from 'react';
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

export default function UsersList({users}) {

    const [sortBy, setSortBy] = useState('name');      // Hangi stüna göre sıralama yapılacağı , başlangıçta 'name' belirlendi
    const [sortOrder, setSortOrder] = useState('asc'); // Sıralama yöntemi | asc(artan) - dsc(azalan)

    const handleSort = (property) => {  // Sıralama yöntemini değiştirir
        const isAsc = sortBy === property && sortOrder === 'asc';
        setSortBy(property);
        setSortOrder(isAsc ? 'desc' : 'asc');
    };

    const sortedUsers = useMemo(() => {
        if (!sortBy) return users;
        const comparator = (a, b) => {
            if (a[sortBy] < b[sortBy]) return -1;
            if (a[sortBy] > b[sortBy]) return 1;
            return 0;
        };
        return users.slice().sort((a, b) => (sortOrder === 'asc' ? comparator(a, b) : -comparator(a, b)));
    }, [sortBy, sortOrder, users]);

    return (
        <TableContainer component={Paper}>
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
                        <TableCell sx={{textAlign:'center'}}>
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
                    {sortedUsers.map((user,index) => (
                        <TableRow
                            hover = {user.mailConfirmation}
                            key={index}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {`${user.name} ${user.surname}`}
                            </TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.permissions}</TableCell>
                            <TableCell>{user.mailConfirmation?<DoneRoundedIcon sx={{display:'flex',margin:'auto'}} color="primary" />:<TimerRoundedIcon sx={{display:'flex',margin:'auto'}} color="error" />}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
