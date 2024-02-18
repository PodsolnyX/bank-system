import {Table, Tag, Typography} from "antd";
import {ColumnsType} from "antd/es/table";
import {dataAccount} from "../mocks/dataAccount.ts";
import {
    convertDateTimmeStringToNormalString,
    convertNumberPriceToNormalString
} from "../../../shared/helpers/stringHelpers.ts";

const AccountPage = () => {

    const {
        history,
        id,
        userName,
        money
    } = dataAccount;

    return (
        <div className={"w-full flex flex-col gap-5"}>
            <div className={"flex flex-col gap-3"}>
                <Typography.Text className={"text-2xl text-lime-500"} strong>История операций</Typography.Text>
                <div className={"flex flex-col gap-2"}>
                    <div className={"flex gap-1 flex-wrap"}>
                        <Typography.Text className={"text-lime-500"} strong>Счет:</Typography.Text>
                        <Typography.Text strong>{id}</Typography.Text>
                    </div>
                    <div className={"flex gap-1 flex-wrap"}>
                        <Typography.Text className={"text-lime-500"} strong>ФИО:</Typography.Text>
                        <Typography.Text strong>{userName}</Typography.Text>
                    </div>
                    <div className={"flex gap-1 flex-wrap"}>
                        <Typography.Text className={"text-lime-500"} strong>Баланс:</Typography.Text>
                        <Typography.Text strong>{convertNumberPriceToNormalString(money)}</Typography.Text>
                    </div>
                </div>
                <Table dataSource={history} columns={columns} bordered size={"small"}/>
            </div>
        </div>
    )
}

export interface AccountHistoryData {
    key: string,
    id: string,
    date: string,
    type: OperationType,
    status: OperationStatus,
    sum: number
}



export enum OperationStatus {
    Success = "success",
    Error = "error",
    InProcess = "inProcess"
}

export const OperationStatusColor: Record<OperationStatus, string> = {
    [OperationStatus.Success]: "green",
    [OperationStatus.Error]: "red",
    [OperationStatus.InProcess]: "default",
}

export const OperationStatusText: Record<OperationStatus, string> = {
    [OperationStatus.Success]: "Успешно",
    [OperationStatus.Error]: "Ошибка",
    [OperationStatus.InProcess]: "В процессе",
}

export enum OperationType {
    Withdraw = "withdraw",
    Replenish = "replenish",
    LoanRepay = "loanRepay"
}

export const OperationTypeColor: Record<OperationType, string> = {
    [OperationType.Withdraw]: "default",
    [OperationType.Replenish]: "green",
    [OperationType.LoanRepay]: "blue",
}

export const OperationTypeText: Record<OperationType, string> = {
    [OperationType.Withdraw]: "Снятие",
    [OperationType.Replenish]: "Пополнение",
    [OperationType.LoanRepay]: "Погашение кредита",
}

const columns: ColumnsType<AccountHistoryData> = [
    {
        title: 'Номер',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Тип',
        dataIndex: 'type',
        key: 'type',
        width: "0",
        render: (text: OperationType) => (
            <Tag color={OperationTypeColor[text]} className={"w-full text-center"}>
                {OperationTypeText[text]}
            </Tag>
        ),
    },
    {
        title: 'Дата и время',
        dataIndex: 'date',
        key: 'date',
        render: (text: string) => convertDateTimmeStringToNormalString(text)
    },
    {
        title: 'Сумма',
        dataIndex: 'sum',
        key: 'sum',
        align: "end",
        render: (text: number) => convertNumberPriceToNormalString(text) || 0
    },
    {
        title: 'Статус',
        dataIndex: 'status',
        key: 'status',
        width: "0",
        render: (text: OperationStatus) => (
            <Tag color={OperationStatusColor[text]} className={"w-full text-center"}>
                {OperationStatusText[text]}
            </Tag>
        ),
    },
];


export default AccountPage;