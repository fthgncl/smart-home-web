import {useState} from "react";
import {useParams} from 'react-router-dom';
import VerifiedIcon from '@mui/icons-material/Verified';
import ErrorIcon from '@mui/icons-material/Error';
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import {apiAddress} from "../config";

export default function ConfirmEmail() {
    const {userId} = useParams();
    const [loading, setLoading] = useState(true);
    const [confirmStatus,setConfirmStatus] = useState(false);

    axios.post(`${apiAddress}/confirm-email`, {userId})
        .then(response => response.data)
        .then(data => data.status === 200 )
        .then(confirmSucces => {
            setLoading(false);
            setConfirmStatus(confirmSucces);
        })
        .catch(console.error);

    const divStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        height: '100vh'
    };


    return (
        <div style={divStyle}>
            {loading&&(<CircularProgress color="info" size={80}/>)}
            {!loading && (confirmStatus ? (
                <>
                    <VerifiedIcon sx={{color:'success.light' ,fontSize:200}}/>
                    <Typography color='success.light' variant="h3" gutterBottom>
                        Hesabınız onayladı
                    </Typography>
                </>

            ) : (
                <>
                    <ErrorIcon sx={{color:'error.main' ,fontSize:200}}/>
                    <Typography sx={{color:'error.main'}} variant="h3" gutterBottom>
                        Hesabınız onaylanamadı !
                    </Typography>
                    <Link href="/signup" variant="h5">
                        {"Yeniden hesap ouşturun"}
                    </Link>
                </>
            ))}

        </div>


    );
}
