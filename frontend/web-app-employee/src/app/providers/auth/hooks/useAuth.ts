import {useContext} from "react";
import {AuthContext} from "../context/AuthContext.ts";

export const useAuth = () => {
    return useContext(AuthContext);
}