import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import SearchBar from '../SearchBar';
import UsersList from './UsersList';
import {useState} from 'react';

export default function UserManagement() {
    const [usersFilter,setUsersFilter] = useState('');

    const onSearchInputChange = (value) => {
        setUsersFilter(value);
    };

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '35px'}}>
                <Typography variant="h4">
                    Kullanıcılar
                </Typography>
                <SearchBar onChange={onSearchInputChange} sx={{width: '100%'}}/>
            </Box>
            <UsersList filter={usersFilter}/>
        </Box>
    );
}

