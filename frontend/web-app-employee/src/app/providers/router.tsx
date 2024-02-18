import {Route, Routes} from "react-router-dom";
import {Links} from "../../constants/Links.ts";
import UsersPage from "../../pages/users";
import AccountsPage from "../../pages/accounts";
import MainPage from "../../pages/main";
import TariffsPage from "../../pages/tariffs";
import AccountPage from "../../pages/account";

const Router = () => {
    return (
        <Routes>
            <Route path={Links.Main} element={<MainPage/>}/>
            <Route path={Links.Users} element={<UsersPage/>}/>
            <Route path={Links.Accounts} element={<AccountsPage/>}/>
            <Route path={Links.Account} element={<AccountPage/>}/>
            <Route path={Links.Tariffs} element={<TariffsPage/>}/>
        </Routes>
    )
}

export default Router;