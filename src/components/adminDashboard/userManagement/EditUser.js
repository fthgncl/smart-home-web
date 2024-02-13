import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Typography from "@mui/material/Typography";

export default function EditUser({isOpen,handleClose}) {

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
                (Kullanıcı Adı)
            </Typography>

        </SwipeableDrawer>
    );
}