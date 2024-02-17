import {Route, Routes} from "react-router-dom";
import {Links} from "../../constants/Links.ts";
import UsersPage from "../../pages/users/ui/UsersPage.tsx";

const Router = () => {
    return (
        <Routes>
            <Route path={Links.Main} element={<div>Главная</div>}/>
            <Route path={Links.Users} element={<UsersPage/>}/>
            <Route path={Links.Accounts} element={<div>Счета</div>}/>
        </Routes>
    )
}

export default Router;