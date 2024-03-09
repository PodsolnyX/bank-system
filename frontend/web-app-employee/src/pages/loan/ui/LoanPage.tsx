import {Breadcrumb, Spin, Typography} from "antd";
import {generatePath, Link, useParams} from "react-router-dom";
import {Links} from "../../../constants/Links.ts";
import {useHistory} from "../../account/hooks/useHistory.ts";
import {useLoan} from "../hooks/useLoan.ts";
import {useEffect} from "react";
import OperationTable from "../../account/ui/OperationTable.tsx";

const LoanPage = () => {

    const {data, isLoading} = useLoan()
    const {id} = useParams();
    const {history, params, setParams} = useHistory();

    useEffect(() => {
        setParams({...params, LoanIds: [id || ""]})
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
                        title: <Link to={generatePath(Links.UserInfo, {id: data.userId || ""})}>{data.userId || "Клиент"}</Link>
                    },
                    {
                        title: "Кредит"
                    }
                ]}/>
                <Typography.Text className={"text-2xl text-lime-500"} strong>История операций</Typography.Text>
                {/*<div className={"grid grid-cols-2 gap-2"}>*/}
                {/*    <div className={"flex gap-1 flex-wrap"}>*/}
                {/*        <Typography.Text className={"text-lime-500"} strong>Счет:</Typography.Text>*/}
                {/*        <Typography.Text strong>{data.id}</Typography.Text>*/}
                {/*    </div>*/}
                {/*    <div className={"flex gap-1 flex-wrap"}>*/}
                {/*        <Typography.Text className={"text-lime-500"} strong>ФИО:</Typography.Text>*/}
                {/*        <Typography.Text strong>{data.userId}</Typography.Text>*/}
                {/*    </div>*/}
                {/*    <div className={"flex gap-1 flex-wrap"}>*/}
                {/*        <Typography.Text className={"text-lime-500"} strong>Баланс:</Typography.Text>*/}
                {/*        <Typography.Text*/}
                {/*            strong>{`${convertNumberPriceToNormalString(data.amount)} ${data.currencyType?.toUpperCase()}`}</Typography.Text>*/}
                {/*    </div>*/}
                {/*    <div className={"flex gap-1 flex-wrap"}>*/}
                {/*        <Typography.Text className={"text-lime-500"} strong>Статус:</Typography.Text>*/}
                {/*        <Tag color={data.closedAt ? "red" : "green"}>{data.closedAt ? "Закрытый" : "Открытый"}</Tag>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <OperationTable
                    data={history.data}
                    loading={history.isLoading}
                />
            </div>
        </div>
    )
}

export default LoanPage