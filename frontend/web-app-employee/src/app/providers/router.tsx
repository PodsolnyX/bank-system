import {Route, Routes} from "react-router-dom";
import {Links} from "../../constants/Links.ts";
import UsersPage from "../../pages/users/ui/UsersPage.tsx";
import AccountsPage from "../../pages/accounts/ui/AccountsPage.tsx";

const Router = () => {
    return (
        <Routes>
            <Route path={Links.Main} element={<div>Главная</div>}/>
            <Route path={Links.Users} element={<UsersPage/>}/>
            <Route path={Links.Accounts} element={<AccountsPage/>}/>
        </Routes>
    )
}

export default Router;