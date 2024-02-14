import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Typography from "@mui/material/Typography";

export default function EditUser({user,isOpen,handleClose}) {

    if ( !isOpen )
        return;

    const handleOpen = () => {

    }

    return (
        <SwipeableDrawer
            anchor={'right'}
            open={isOpen}
            onClose={handleClose}
            onOpen={handleOpen}
        >

            <Typography variant="h4">
                {user.name} {user.surname}
            </Typography>

        </SwipeableDrawer>
    );
}