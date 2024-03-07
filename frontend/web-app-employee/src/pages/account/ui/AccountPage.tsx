import {Spin, TableProps, Tag, Typography} from "antd";
import {ColumnsType} from "antd/es/table";
import {
    convertDateTimmeStringToNormalString,
    convertNumberPriceToNormalString
} from "../../../shared/helpers/stringHelpers.ts";
import {useAccount} from "../hooks/useAccount.ts";
import {useHistory} from "../hooks/useHistory.ts";

const AccountPage = () => {

    const {data, isLoading} = useAccount();
    const {data: history} = useHistory();

    console.log(history)

    const onChange: TableProps<AccountHistoryData>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log(filters)
    };

    return (
        <div className={"w-full flex flex-col gap-5"}>
            <div className={"flex flex-col gap-3"}>
                {
                    !data || isLoading ? <Spin/> :
                        <>
                            <Typography.Text className={"text-2xl text-lime-500"} strong>История операций</Typography.Text>
                            <div className={"grid grid-cols-2 gap-2"}>
                                <div className={"flex gap-1 flex-wrap"}>
                                    <Typography.Text className={"text-lime-500"} strong>Счет:</Typography.Text>
                                    <Typography.Text strong>{data.id}</Typography.Text>
                                </div>
                                <div className={"flex gap-1 flex-wrap"}>
                                    <Typography.Text className={"text-lime-500"} strong>ФИО:</Typography.Text>
                                    <Typography.Text strong>{data.userId}</Typography.Text>
                                </div>
                                <div className={"flex gap-1 flex-wrap"}>
                                    <Typography.Text className={"text-lime-500"} strong>Баланс:</Typography.Text>
                                    <Typography.Text strong>{`${convertNumberPriceToNormalString(data.amount)} ${data.currencyType?.toUpperCase()}`}</Typography.Text>
                                </div>
                                <div className={"flex gap-1 flex-wrap"}>
                                    <Typography.Text className={"text-lime-500"} strong>Статус:</Typography.Text>
                                    <Tag color={data.closedAt ? "red" : "green"}>{data.closedAt ? "Закрытый" : "Открытый"}</Tag>
                                </div>
                            </div>
                        </>
                }
                {/*<Table dataSource={history} columns={columns} bordered size={"small"} onChange={onChange}/>*/}
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
        sorter: (a, b) => a.id.localeCompare(b.id),
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
        filterSearch: true,
        // @ts-ignore
        onFilter: (value: string, record) => record.type.startsWith(value),
        filters: [
            {
                text: OperationTypeText[OperationType.Replenish],
                value: OperationType.Replenish,
            },
            {
                text: OperationTypeText[OperationType.Withdraw],
                value: OperationType.Withdraw,
            },
            {
                text: OperationTypeText[OperationType.LoanRepay],
                value: OperationType.LoanRepay,
            },
        ],
    },
    {
        title: 'Дата и время',
        dataIndex: 'date',
        key: 'date',
        sorter: (a, b) => a.date.localeCompare(b.date),
        render: (text: string) => convertDateTimmeStringToNormalString(text)
    },
    {
        title: 'Сумма',
        dataIndex: 'sum',
        key: 'sum',
        align: "end",
        sorter: (a, b) => a.sum - b.sum,
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
        filterSearch: true,
        // @ts-ignore
        onFilter: (value: string, record) => record.status.startsWith(value),
        filters: [
            {
                text: OperationStatusText[OperationStatus.Success],
                value: OperationStatus.Success,
            },
            {
                text: OperationStatusText[OperationStatus.Error],
                value: OperationStatus.Error,
            },
            {
                text: OperationStatusText[OperationStatus.InProcess],
                value: OperationStatus.InProcess,
            },
        ],
    },
];


export default AccountPage;