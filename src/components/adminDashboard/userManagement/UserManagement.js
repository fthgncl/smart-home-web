import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import SearchBar from '../SearchBar';
import UsersList from './UsersList';
import getUsersData from '../../../helper/getUsers';
import {useState} from 'react';

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [haveFilter, setHaveFilter] = useState(false);

    const onSearchInputChange = (value) => {
        setHaveFilter((value.length > 0));
        setFilteredUsers(users.filter(user => {
            for (const property of Object.values(user)) {
                if (typeof property === 'string' && property.toLowerCase().includes(value.toLowerCase())) {
                    return true;
                }
            }
            return false;
        }));
    };

    if (users.length === 0) {
        getUsersData("name surname phone email permissions mailConfirmation")
            .then(userData => {
                setUsers(userData);
            })
            .catch(error => {
                console.error('Error ' +
                    'fetching users:', error);
            });
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '35px'}}>
                <Typography variant="h4">
                    Kullanıcılar
                </Typography>
                <SearchBar onChange={onSearchInputChange} sx={{width: '100%'}}/>
            </Box>

            <UsersList users={haveFilter ? filteredUsers : users}/>
        </Box>
    );
}