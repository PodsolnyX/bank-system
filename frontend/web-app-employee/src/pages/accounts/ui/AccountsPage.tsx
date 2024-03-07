import {Spin, Table, Typography} from "antd";
import {convertNumberPriceToNormalString} from "../../../shared/helpers/stringHelpers.ts";
import {ColumnsType} from "antd/es/table";
import {generatePath, Link} from "react-router-dom";
import {Links} from "../../../constants/Links.ts";
import {useAccounts} from "../hooks/useAccounts.ts";
import {AccountDto} from "../../../services/account/models/AccountDto.ts";

const AccountsPage = () => {

    const {data, isLoading} = useAccounts();

    return (
        <div className={"w-full flex flex-col gap-5"}>
            <div className={"flex flex-col gap-3"}>
                <div className={"flex justify-between"}>
                    <Typography.Text className={"text-2xl text-lime-500"} strong>Счета</Typography.Text>
                </div>
                <Table
                    loading={isLoading}
                    dataSource={getData(data)}
                    columns={columns}
                    bordered
                    size={"small"}
                    className={"w-full"}
                />
            </div>
        </div>
    )
}

const getData = (data?: AccountDto[]) => {
    if (!data || !data.length) return [];
    return data.map(it => {
        return {
            key: it.id,
            userName: it.userName || "",
            id: it.id,
            amount: it.amount,
            currencyType: it.currencyType
        }
    })
}

interface AccountData {
    key: string;
    userName: string;
    id: string;
    amount: number;
    currencyType: string
}

const columns: ColumnsType<AccountData> = [
    {
        title: 'ФИО',
        dataIndex: 'userName',
        key: 'userName',
        sorter: (a, b) => a.userName.localeCompare(b.userName),
    },
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => a.id.localeCompare(b.id),
        render: (text: string) => <Link to={generatePath(Links.Account, {id:text})}>{text}</Link>
    },
    {
        title: 'Баланс',
        dataIndex: 'amount',
        key: 'amount',
        align: "end",
        sorter: (a, b) => a.amount - b.amount,
        render: (text: number) => convertNumberPriceToNormalString(text) || 0
    },
    {
        title: 'Валюта',
        dataIndex: 'currencyType',
        key: 'currencyType',
        render: (text: string) => text.toUpperCase(),
        width: "0px",
        align: "center",
        sorter: (a, b) => a.currencyType.localeCompare(b.currencyType),
    },
];



export default AccountsPage;