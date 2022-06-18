import axios from "axios";

export const local = axios.create({
    baseURL: 'http://localhost:3001/'
});

export const nse = axios.create({
    baseURL: 'https://www1.nseindia.com/',
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Accept": "*/*",
        'Access-Control-Allow-Credentials':true
    }
});
