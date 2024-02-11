import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import {useState} from "react";

export default function SearchBar({onChange}) {
    const [searchValue, setSearchValue] = useState('');
    const handleSearchValue = (event) => {
        const value = event.target.value;
        setSearchValue(value);
        if (onChange) {
            onChange(value);
        }
    }

    return (
        <Paper
            component="form"
            sx={{
                p: '2px 4px',
                display: 'flex',
                alignSelf: 'flex-end',
                alignItems: 'center',
                maxWidth: 400
            }}
        >
            <InputBase
                sx={{ml: 1, flex: 1}}
                placeholder="Kullanıcılar içinde ara"
                value={searchValue}
                onChange={handleSearchValue}
            />
            <IconButton type="button" sx={{p: '10px'}} aria-label="search">
                <SearchIcon/>
            </IconButton>
        </Paper>
    );
}
