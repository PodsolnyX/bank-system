import {Navigate, Route, Routes} from "react-router-dom";
import {Links} from "../../constants/Links.ts";
import UsersPage from "../../pages/users";
import AccountsPage from "../../pages/accounts";
import MainPage from "../../pages/main";
import TariffsPage from "../../pages/tariffs";
import AccountPage from "../../pages/account";
import LoginPage from "../../pages/login";
import UserInfoPage from "../../pages/userInfo";
import LoanPage from "../../pages/loan";
import {useAuth} from "oidc-react";
import authService from "../../services/auth/AuthService.ts";
import {useQuery} from "@tanstack/react-query";

const Router = () => {

    const {userData} = useAuth();

    return ( !!userData ? <AuthRoutes/> : <UnauthRoutes/> )
}

const AuthRoutes = () => {

    const {data} =  useQuery({
        queryKey: ["GET_THEME"],
        queryFn: () => authService.getTheme(),
        select: ({data}) => data,
    })

    console.log(data?.theme)

    return (
        <Routes>
            <Route path={Links.Main} element={<MainPage/>}/>
            <Route path={Links.Users} element={<UsersPage/>}/>
            <Route path={Links.Accounts} element={<AccountsPage/>}/>
            <Route path={Links.Account} element={<AccountPage/>}/>
            <Route path={Links.Loan} element={<LoanPage/>}/>
            <Route path={Links.Tariffs} element={<TariffsPage/>}/>
            <Route path={Links.UserInfo} element={<UserInfoPage/>}/>
            <Route path={"/*"} element={<Navigate to={Links.Main} />}/>
        </Routes>
    )
}

const UnauthRoutes = () => {
    return (
        <Routes>
            <Route path={Links.Login} element={<LoginPage/>}/>
            <Route path={"/*"} element={<Navigate to={Links.Login} />}/>
        </Routes>
    )
}

export default Router;