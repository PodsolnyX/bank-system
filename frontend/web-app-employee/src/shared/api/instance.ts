import axios from "axios";
import {getAccessToken} from "../helpers/localStorageHelpers.ts";

const API_URL = "http://localhost:3000";

export const instance = axios.create({
    baseURL: `${API_URL}/`,
    headers: {'Authorization': `Bearer ${getAccessToken()}`},
    withCredentials: true,
    paramsSerializer: { indexes: null }
});