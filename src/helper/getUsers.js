import axios from "axios";
import {apiAddress} from "../config";
import {Account} from "../context/AccountContext";

export default function getUsersData(requestedData) {
    const token = Account().accountProps.token.code;

    return new Promise((resolve, reject) => {
        axios.post(`${apiAddress}/getUsers`, {token, requestedData})
            .then(response => resolve(response.data))
            .catch(error => reject(error));
    });
}