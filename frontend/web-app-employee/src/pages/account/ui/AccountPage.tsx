import {Spin, Table, TableProps, Tag, Typography} from "antd";
import {ColumnsType} from "antd/es/table";
import {
    convertDateTimmeStringToNormalString,
    convertNumberPriceToNormalString
} from "../../../shared/helpers/stringHelpers.ts";
import {useAccount} from "../hooks/useAccount.ts";
import {useHistory} from "../hooks/useHistory.ts";
import {OperationDto, OperationStatus, OperationType} from "../../../services/operationHistory/models/OperationDto.ts";

const AccountPage = () => {

    const {data, isLoading} = useAccount();
    const {data: history} = useHistory();

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
                {
                    data &&
                    <Table
                        dataSource={getData(history)}
                        columns={columns}
                        bordered
                        size={"small"}
                        onChange={onChange}
                        pagination={{
                            pageSize: 20
                        }}
                    />
                }
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
    sum: number,
    currencyType: string
}

export const OperationStatusColor: Record<OperationStatus, string> = {
    [OperationStatus.Success]: "green",
    [OperationStatus.Failure]: "red",
    [OperationStatus.Processing]: "default",
}

export const OperationStatusText: Record<OperationStatus, string> = {
    [OperationStatus.Success]: "Успешно",
    [OperationStatus.Failure]: "Ошибка",
    [OperationStatus.Processing]: "В процессе",
}

export const OperationTypeColor: Record<OperationType, string> = {
    [OperationType.Withdraw]: "default",
    [OperationType.Deposit]: "green",
    [OperationType.LoanCharge]: "blue",
    [OperationType.LoanIncome]: "blue",
}

export const OperationTypeText: Record<OperationType, string> = {
    [OperationType.Withdraw]: "Снятие",
    [OperationType.Deposit]: "Пополнение",
    [OperationType.LoanCharge]: "Погашение кредита",
    [OperationType.LoanIncome]: "blue",
}

function getData(data?: OperationDto[]) {
    if (!data) return []
    return data.map(it => {
        return {
            key: it.id,
            id: it.id,
            date: it.date,
            type: it.type,
            status: it.status,
            sum: it.amount,
            message: it.message,
            currencyType: it.currencyType
        }
    })
}


const columns: ColumnsType<AccountHistoryData> = [
    {
        title: 'Номер',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
        title: 'Сообщение',
        dataIndex: 'message',
        key: 'message',
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
        // filters: [
        //     {
        //         text: OperationTypeText[OperationType.Replenish],
        //         value: OperationType.Replenish,
        //     },
        //     {
        //         text: OperationTypeText[OperationType.Withdraw],
        //         value: OperationType.Withdraw,
        //     },
        //     {
        //         text: OperationTypeText[OperationType.LoanRepay],
        //         value: OperationType.LoanRepay,
        //     },
        // ],
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
        render: (text: number, record) => `${convertNumberPriceToNormalString(text)} ${record.currencyType.toUpperCase()}`
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
        // filters: [
        //     {
        //         text: OperationStatusText[OperationStatus.Success],
        //         value: OperationStatus.Success,
        //     },
        //     {
        //         text: OperationStatusText[OperationStatus.Error],
        //         value: OperationStatus.Error,
        //     },
        //     {
        //         text: OperationStatusText[OperationStatus.InProcess],
        //         value: OperationStatus.InProcess,
        //     },
        // ],
    },
];


export default AccountPage;