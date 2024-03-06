import React, {useState} from "react";
import { AuthContext } from "./AuthContext";
import {useMutation} from "@tanstack/react-query";
import authService from "../../../../services/auth/AuthService.ts";

interface AuthProviderProps {
    children?: React.ReactNode
}

export const AuthProvider= (props: AuthProviderProps) => {
    const { children } = props;

    const [isAuth, setIsAuth] = useState(!!localStorage.getItem("mail"));
    const {mutate: logout} = useMutation({
        mutationFn: () => authService.logout(),
        onSuccess: () => {
            setIsAuth(false);
        },
        onError: () => {
            setIsAuth(false);
        }
    })

    const signIn = (mail: string) => {
        localStorage.setItem("mail", mail);
        setIsAuth(true);
    }

    const signOut = () => {
        localStorage.removeItem("mail");
        logout();
    }

    const value = {
        isAuth,
        signIn,
        signOut
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}