import {Table, Typography} from "antd";
import {convertNumberPriceToNormalString} from "../../../shared/helpers/stringHelpers.ts";
import {ColumnsType} from "antd/es/table";
import {generatePath, Link} from "react-router-dom";
import {Links} from "../../../constants/Links.ts";
import {dataAccounts} from "../mocks/dataAccounts.ts";

const AccountsPage = () => {
    return (
        <div className={"w-full flex flex-col gap-5"}>
            <div className={"flex flex-col gap-3"}>
                <div className={"flex justify-between"}>
                    <Typography.Text className={"text-2xl text-lime-500"} strong>Счета</Typography.Text>
                </div>
                <Table dataSource={dataAccounts} columns={columns} bordered size={"small"}/>
            </div>
        </div>
    )
}

interface AccountData {
    key: string;
    name: string;
    id: string;
    money: number
}

const columns: ColumnsType<AccountData> = [
    {
        title: 'ФИО',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
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
        dataIndex: 'money',
        key: 'money',
        align: "end",
        sorter: (a, b) => a.money - b.money,
        render: (text: number) => convertNumberPriceToNormalString(text) || 0
    }
];



export default AccountsPage;