import axios from "axios";
import {server} from "./server.js";
const axiosIntance = axios.create({
    baseURL: server,
    // baseURL: serverUrl1,
});

export const updateToken = jwt => {
    axiosIntance.interceptors.request.use(config => {
        config.headers.authorization = 'Bearer ' + jwt;
        return config
    });
}

export const updateHeaderId = id => {
    axiosIntance.interceptors.request.use(config => {
        config.headers.id = id;
        return config
    });
}

export default axiosIntance;