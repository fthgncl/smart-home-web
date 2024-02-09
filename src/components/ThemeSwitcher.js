import {useState} from 'react';
import Box from '@mui/material/Box';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Switch from '@mui/material/Switch';
import { useTheme } from '@mui/material/styles';

import { useDispatch } from 'react-redux';
import { setTheme } from '../store/slices/themeSlice';

export default function ThemeSwitcher() {

    const dispatch = useDispatch();
    const darkMode = useTheme().palette.mode === 'dark';

    const [isSwitchOn,setIsSwitchOn] = useState(darkMode);

    const handleClick = () => {
        dispatch(setTheme(isSwitchOn?'light':'dark'));
        setIsSwitchOn(!isSwitchOn);
    }


    return (
        <Box id='testdeneme'
             sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
            <Brightness7Icon/>
            <Switch checked={isSwitchOn} onClick={handleClick} />
            <Brightness4Icon/>
        </Box>
    );
}
