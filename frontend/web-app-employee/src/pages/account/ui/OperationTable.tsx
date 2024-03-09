import {Table, Tag} from "antd";
import {OperationDto, OperationStatus, OperationType} from "../../../services/operationHistory/models/OperationDto.ts";
import {ColumnsType} from "antd/es/table";
import {
    convertDateTimmeStringToNormalString,
    convertNumberPriceToNormalString
} from "../../../shared/helpers/stringHelpers.ts";

interface OperationTableProps {
    loading?: boolean,
    data?: OperationDto[],
    pageSize?: number
}

const OperationTable = (props: OperationTableProps) => {

    const {
        loading,
        data,
        pageSize = 20
    } = props;

    return (
        <Table
            loading={loading}
            dataSource={getData(data)}
            columns={columns}
            bordered
            size={"small"}
            className={"w-full"}
            pagination={{
                pageSize
            }}
        />
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
            date: it.createdAt,
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
        defaultSortOrder: "descend",
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

export default OperationTable;