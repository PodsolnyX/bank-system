import {Table, Typography} from "antd";
import {convertNumberPriceToNormalString} from "../../../helpers/stringHelpers.ts";
import {ColumnsType} from "antd/es/table";
import {generatePath, Link} from "react-router-dom";
import {Links} from "../../../constants/Links.ts";

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

interface DataAccountType {
    key: string;
    name: string;
    id: string;
    money: number
}

const dataAccounts = [
    {
        key: '1',
        name: 'Артамонов Михаил Потапович',
        id: "0000-0000-0000-0001",
        money: 1000
    },
    {
        key: '2',
        name: 'Усов Никита Никитич',
        id: "0000-0000-0000-0002",
        money: 10000
    },
];

const columns: ColumnsType<DataAccountType> = [
    {
        title: 'ФИО',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (text: string) => <Link to={generatePath(Links.Account, {id:text})}>{text}</Link>
    },
    {
        title: 'Баланс',
        dataIndex: 'money',
        key: 'money',
        align: "end",
        render: (text: number) => convertNumberPriceToNormalString(text) || 0

    }
];



export default AccountsPage;