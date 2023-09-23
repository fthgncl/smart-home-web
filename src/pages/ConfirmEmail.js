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
                    <VerifiedIcon color='success' style={{fontSize: '200px'}}/>
                    <Typography color='green' variant="h3" gutterBottom>
                        Hesabınız onayladı
                    </Typography>
                </>

            ) : (
                <>
                    <ErrorIcon color='error' style={{fontSize: '200px', marginBottom: '20px'}}/>
                    <Typography color='#D12F2FFF' variant="h3" gutterBottom>
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
