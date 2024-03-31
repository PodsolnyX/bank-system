import {Badge, Breadcrumb, Spin, Tag, Tooltip, Typography} from "antd";
import {
    convertNumberPriceToNormalString
} from "../../../shared/helpers/stringHelpers.ts";
import {useAccount} from "../hooks/useAccount.ts";
import {useHistory} from "../hooks/useHistory.ts";
import {generatePath, Link, useParams} from "react-router-dom";
import {Links} from "../../../constants/Links.ts";
import {useEffect} from "react";
import OperationTable from "./OperationTable.tsx";

const AccountPage = () => {

    const {data, isLoading} = useAccount();
    const {id} = useParams();
    const {history, params, setParams} = useHistory();

    useEffect(() => {
        setParams({...params, AccountIds: [id || ""]})
    }, [id]);

    if (!data || isLoading) return <Spin/>

    return (
        <div className={"w-full flex flex-col gap-5"}>
            <div className={"flex flex-col gap-3"}>
                <Breadcrumb items={[
                    {
                        title: <Link to={Links.Users}>Пользователи</Link>
                    },
                    {
                        title: <Link to={generatePath(Links.UserInfo, {id: data.userId || ""})}>{data.userName || "Клиент"}</Link>
                    },
                    {
                        title: "Счет"
                    }
                ]}/>
                <Typography.Text className={"text-2xl text-lime-500"} strong>История операций</Typography.Text>
                <div className={"grid grid-cols-2 gap-2"}>
                    <div className={"flex gap-1 flex-wrap"}>
                        <Typography.Text className={"text-lime-500"} strong>Счет:</Typography.Text>
                        <Typography.Text strong className={"dark:text-white"}>{data.id}</Typography.Text>
                        {
                            data.isPriority ? <Tooltip title={"Приоритетный счёт"}>
                                <Badge color={"green"} status={"processing"}/>
                            </Tooltip> : undefined
                        }
                    </div>
                    <div className={"flex gap-1 flex-wrap"}>
                        <Typography.Text className={"text-lime-500"} strong>ФИО:</Typography.Text>
                        <Typography.Text strong className={"dark:text-white"}>{data.userId}</Typography.Text>
                    </div>
                    <div className={"flex gap-1 flex-wrap"}>
                        <Typography.Text className={"text-lime-500"} strong>Баланс:</Typography.Text>
                        <Typography.Text  className={"dark:text-white"}
                            strong>{`${convertNumberPriceToNormalString(data.amount)} ${data.currencyType?.toUpperCase()}`}</Typography.Text>
                    </div>
                    <div className={"flex gap-1 flex-wrap"}>
                        <Typography.Text className={"text-lime-500"} strong>Статус:</Typography.Text>
                        <Tag color={data.closedAt ? "red" : "green"}>{data.closedAt ? "Закрытый" : "Открытый"}</Tag>
                    </div>
                </div>
                <OperationTable
                    data={history.data}
                    loading={history.isLoading}
                />
            </div>
        </div>
    )
}




export default AccountPage;