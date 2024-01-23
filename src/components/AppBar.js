import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import {Account} from "../context/AccountContext";
import {useDispatch} from 'react-redux';
import {userDisconnected} from '../store/slices/accountSlice';

export default function MenuAppBar() {

    const dispatch = useDispatch();
    const token = Account().accountProps.token;
    const auth = token.active;

    const handleLogOut = () => {
        dispatch(userDisconnected());
    }

    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box id='AppBar' sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography onClick={()=>window.location.href = '/'}  variant="h6" component="div" sx={{flexGrow: 1, cursor: 'pointer'}}>
                        Smart Home
                    </Typography>
                    {auth ? (
                        <div>

                            <IconButton
                                sx={{borderRadius: 3}}
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <Typography variant="h6" component="div"
                                            sx={{flexGrow: 2, marginRight: 2, fontSize: 15}}>
                                    {token.data.name}
                                </Typography>
                                <AccountCircle/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={()=> window.location.href = '/account'}>Hesap</MenuItem>
                                <MenuItem onClick={()=> window.location.href = '/dashboard'}>Kontrol Paneli</MenuItem>
                                <MenuItem onClick={handleLogOut}>Oturumu Kapat</MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        <div>
                            <IconButton onClick={()=>window.location.href = '/login'} sx={{borderRadius: 3}} size="large" color="inherit">
                                <Typography sx={{flexGrow: 2, marginRight: 2, fontSize: 15}}>
                                    Giriş Yap
                                </Typography>
                                <AccountCircle/>
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
