import {useState} from "react";
import Box from "@mui/material/Box";
import LeftDrawer from "../components/adminDashboard/LeftDrawer";
import UserManagement from "../components/adminDashboard/UserManagement";


export default function AdminDashboard() {

    const [mainBoxMarginLeft, setMainBoxMarginLeft] = useState();
    const handleMainBoxMarginLeft = (width) => {
        setMainBoxMarginLeft(width);
    }

    const [pageName,setPageName] = useState("");
    const handleChangePage = (pageName) => {
        switch(pageName){
            case "UserManagement":{
                setPageName(<UserManagement/>);
                break;
            }
            default:{
                setPageName(<div>Geçersiz Sayfa</div>);
                break;
            }
        }
    }

    return (
        <>
            <LeftDrawer setMainBoxMarginLeft={handleMainBoxMarginLeft} handleChangePage={handleChangePage}/>
            <Box component="main"
                 sx={{marginLeft: mainBoxMarginLeft, transition: `margin-left 0.5s ease`, flexGrow: 1, p: 3}}>
                {pageName}
            </Box>
        </>
    );
}