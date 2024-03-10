import {createContext} from "react";

export interface AuthContextValue {
    isAuth: boolean;
    signIn(mail: string): void;
    signOut(): void;
}

const defaultValue: AuthContextValue = {
    isAuth: false,
    signOut() {},
    signIn(_mail: string) {}
}

export const AuthContext = createContext<AuthContextValue>(defaultValue);