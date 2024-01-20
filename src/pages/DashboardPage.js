import {Account} from "../context/AccountContext";

export default function DashboardPage(){
    const token = Account().accountProps.token;
    const auth = token.active;

    if ( !auth ){
        window.location.href = '/login';
    }

    return (
        <div>Dashboard Page</div>
    );
}