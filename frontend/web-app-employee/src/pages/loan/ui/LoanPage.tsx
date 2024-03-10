import {Breadcrumb, Spin, Tag, Typography} from "antd";
import {generatePath, Link, useParams} from "react-router-dom";
import {Links} from "../../../constants/Links.ts";
import {useHistory} from "../../account/hooks/useHistory.ts";
import {useUserPayments} from "../hooks/useUserPayments.ts";
import {useEffect} from "react";
import OperationTable from "../../account/ui/OperationTable.tsx";
import UserPaymentsTable from "./UserPaymentsTable.tsx";
import {useLoan} from "../hooks/useLoan.ts";
import {
    convertDateTimmeStringToNormalString,
    convertNumberPriceToNormalString
} from "../../../shared/helpers/stringHelpers.ts";

const LoanPage = () => {

    const {data, isLoading} = useUserPayments()
    const {data: loan, isLoading: isLoadingLoan} = useLoan();
    const {loanId, userId} = useParams();
    const {history, params, setParams} = useHistory();

    useEffect(() => {
        setParams({...params, LoanIds: [loanId || ""]})
    }, [loanId]);

    if (!data || !loan || isLoading || isLoadingLoan) return <Spin/>

    return (
        <div className={"w-full flex flex-col gap-5"}>
            <div className={"flex flex-col gap-3"}>
                <Breadcrumb items={[
                    {
                        title: <Link to={Links.Users}>Пользователи</Link>
                    },
                    {
                        title: <Link to={generatePath(Links.UserInfo, {id:userId || ""})}>{"Клиент"}</Link>
                    },
                    {
                        title: "Кредит"
                    }
                ]}/>
                <div className={"grid grid-cols-2 gap-2"}>
                    <div className={"flex gap-1 flex-wrap"}>
                        <Typography.Text className={"text-lime-500"} strong>Кредит:</Typography.Text>
                        <Typography.Text strong>{loan.id}</Typography.Text>
                    </div>
                    <div className={"flex gap-1 flex-wrap"}>
                        <Typography.Text className={"text-lime-500"} strong>ФИО:</Typography.Text>
                        <Typography.Text strong>{loan.userId}</Typography.Text>
                    </div>
                    <div className={"flex gap-1 flex-wrap"}>
                        <Typography.Text className={"text-lime-500"} strong>Счет:</Typography.Text>
                        <Typography.Text strong>{loan.accountId}</Typography.Text>
                    </div>
                    <div className={"flex gap-1 flex-wrap"}>
                        <Typography.Text className={"text-lime-500"} strong>Последняя выплата:</Typography.Text>
                        <Typography.Text strong>{convertDateTimmeStringToNormalString(loan.lastChargeDate)}</Typography.Text>
                    </div>
                    <div className={"flex gap-1 flex-wrap"}>
                        <Typography.Text className={"text-lime-500"} strong>Долг:</Typography.Text>
                        <Typography.Text
                            strong>{`${convertNumberPriceToNormalString(loan.debt)} ${loan.currencyType.toUpperCase()}`}</Typography.Text>
                    </div>
                    <div className={"flex gap-1 flex-wrap"}>
                        <Typography.Text className={"text-lime-500"} strong>Статус:</Typography.Text>
                        <Tag color={loan.isClosed ? "default" : "blue"}>{loan.isClosed ? "Закрыт" : "Открыт"}</Tag>
                    </div>
                    <div className={"flex gap-1 flex-wrap"}>
                        <Typography.Text className={"text-lime-500"} strong>Тариф:</Typography.Text>
                        <Typography.Text strong>{loan.tariff.name}</Typography.Text>
                    </div>
                    <div className={"flex gap-1 flex-wrap"}>
                        <Typography.Text className={"text-lime-500"} strong>Ставка:</Typography.Text>
                        <Typography.Text strong>{`${loan.tariff.interestRate}%`}</Typography.Text>
                    </div>
                    <div className={"flex gap-1 flex-wrap"}>
                        <Typography.Text className={"text-lime-500"} strong>Период:</Typography.Text>
                        <Typography.Text strong>{`${loan.tariff.periodInDays} дней`}</Typography.Text>
                    </div>
                </div>
                <Typography.Text className={"text-2xl text-lime-500"} strong>Счета на оплату</Typography.Text>
                <UserPaymentsTable
                    data={data}
                    loading={isLoading}
                />
                <Typography.Text className={"text-2xl text-lime-500"} strong>История операций</Typography.Text>
                <OperationTable
                    data={history.data}
                    loading={history.isLoading}
                />
            </div>
        </div>
    )
}

export default LoanPage