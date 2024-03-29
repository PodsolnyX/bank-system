import {Breadcrumb, Spin, Tag, Typography} from "antd";
import {useUserInfo} from "../hooks/useUserInfo.ts";
import AccountsTable from "../../accounts/ui/AccountsTable.tsx";
import LoansTable from "./LoansTable.tsx";
import {Link} from "react-router-dom";
import {Links} from "../../../constants/Links.ts";

const UserInfoPage = () => {


    const {data, isLoading} = useUserInfo();

    if (!data || isLoading) {
        return <Spin/>
    }

    if (!data.user) return "Ошибка"

    return (
        <div className={"w-full flex flex-col gap-5"}>
            <div className={"flex flex-col gap-3"}>
                <Breadcrumb items={[
                    {
                        title: <Link to={Links.Users}>Пользователи</Link>
                    },
                    {
                        title: data.user.name
                    },
                ]}/>
                <Typography.Text className={"text-2xl text-lime-500"} strong>{`Пользователь: ${data.user.name}`}</Typography.Text>
                <div className={"grid grid-cols-2 gap-2"}>
                    <div className={"flex gap-1 flex-wrap"}>
                        <Typography.Text className={"text-lime-500"} strong>ID:</Typography.Text>
                        <Typography.Text strong>{data.user.id}</Typography.Text>
                    </div>
                    <div className={"flex gap-1 flex-wrap"}>
                        <Typography.Text className={"text-lime-500"} strong>ФИО:</Typography.Text>
                        <Typography.Text strong>{data.user.name}</Typography.Text>
                    </div>
                    <div className={"flex gap-1 flex-wrap"}>
                        <Typography.Text className={"text-lime-500"} strong>Mail:</Typography.Text>
                        <Typography.Text strong>{data.user.mail}</Typography.Text>
                    </div>
                    <div className={"flex gap-1 flex-wrap"}>
                        <Typography.Text className={"text-lime-500"} strong>Статус:</Typography.Text>
                        <Typography.Text strong>{data.user.bannedAt ? "Заблокирован" : "Активен"}</Typography.Text>
                    </div>
                    <div className={"flex gap-1 flex-wrap"}>
                        <Typography.Text className={"text-lime-500"} strong>Роль:</Typography.Text>
                        <Typography.Text strong>{data.user.isEmployee ? "Сотрудник" : "Клиент"}</Typography.Text>
                    </div>
                    <div className={"flex gap-1 flex-wrap"}>
                        <Typography.Text className={"text-lime-500"} strong>Кредитный рейтинг:</Typography.Text>
                        <Tag color={"blue"}>{data.loanRating}</Tag>
                    </div>
                </div>
                <Typography.Text className={"text-2xl text-lime-500"} strong>{`Счета`}</Typography.Text>
                <AccountsTable data={data.accounts} pageSize={5}/>
                <Typography.Text className={"text-2xl text-lime-500"} strong>{`Кредиты`}</Typography.Text>
                <LoansTable data={data.loans} pageSize={5}/>
            </div>
        </div>
    )
}

export default UserInfoPage;