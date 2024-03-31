import React, {createContext, useContext, useEffect, useState} from "react";
import {ConfigProvider} from "antd";
import locale from "antd/locale/ru_RU";
import authService from "../../../services/auth/AuthService.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useAuth} from "oidc-react";
import {Theme} from "../../../services/auth/models/ThemeDto.ts";

const ThemeProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

    const [theme, setTheme] = useState<Theme>(localStorage.getItem("theme") as Theme || "Default");
    const {userData} = useAuth();
    const queryClient = useQueryClient();

    const {data} =  useQuery({
        queryKey: ["GET_THEME"],
        queryFn: () => authService.getTheme(),
        select: ({data}) => data,
        enabled: !!userData?.access_token
    })

    const {mutate: reqChangeTheme} = useMutation({
        mutationFn: () => authService.updateTheme({theme}),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["GET_THEME"] } )
        }
    })
    const changeTheme = () => {
        setTheme(theme === "Default" ? "Dark" : "Default");
        localStorage.setItem("theme", theme);
        reqChangeTheme();
    }

    useEffect(() => {
        theme === "Dark"
         ? document.body.classList.add('dark')
         : document.body.classList.remove("dark")
    }, [theme]);

    useEffect(() => {
        if (data?.theme) {
            setTheme(data.theme)
            localStorage.setItem("theme", theme);
        }
    }, [data]);

    return (
        <ThemeContext.Provider value={{changeTheme}}>
            <ConfigProvider locale={locale} theme={{
                token: {
                    colorPrimary: "#2ea90c",
                },
                components: {
                },
            }}>
                {children}
            </ConfigProvider>
        </ThemeContext.Provider>
    );
}

export interface ThemeContextValue {
    changeTheme(): void
}

const defaultValue: ThemeContextValue = {
    changeTheme() {}
}

export const useTheme = () => {
    return useContext(ThemeContext);
}

export const ThemeContext = createContext<ThemeContextValue>(defaultValue);
export default ThemeProvider;