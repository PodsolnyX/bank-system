import {Table, Tag} from "antd";
import {
    convertDateTimmeStringToNormalString,
    convertNumberPriceToNormalString
} from "../../../shared/helpers/stringHelpers.ts";
import {ColumnsType} from "antd/es/table";
import {UserPaymentsDto} from "../../../services/loan/models/UserPaymentsDto.ts";

interface LoansTableProps {
    loading?: boolean,
    data?: UserPaymentsDto[],
    pageSize?: number
}

const UserPaymentsTable = (props: LoansTableProps) => {

    const {
        loading,
        data,
        pageSize = 20
    } = props;

    return (
        <Table
            loading={loading}
            dataSource={getData(data)}
            columns={getTableColumns()}
            bordered
            size={"small"}
            className={"w-full"}
            pagination={{
                pageSize
            }}
        />
    )
}

const getData = (data?: UserPaymentsDto[]) => {
    if (!data || !data.length) return [];
    return data.map(it => {
        return {
            key: it.id,
            id: it.id,
            amountForPay: it.amountForPay,
            alreadyPaid: it.alreadyPaid,
            paidAt: it.paidAt,
            isActual: it.isActual,
            penaltyFee: it.penaltyFee,
            createdAt: it.createdAt
        }
    })
}

interface PaymentData {
    key: string;
    id: string,
    amountForPay: number,
    alreadyPaid: number,
    paidAt?: string,
    isActual: boolean,
    penaltyFee: number,
    createdAt: string
}

function getTableColumns(): ColumnsType<PaymentData> {

    const columns:ColumnsType<PaymentData> = [];

    return [
        ...columns,
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id.localeCompare(b.id),
        },
        {
            title: 'К выплате',
            dataIndex: 'amountForPay',
            key: 'amountForPay',
            render: text => convertNumberPriceToNormalString(text)
        },
        {
            title: 'Выплачено',
            dataIndex: 'alreadyPaid',
            key: 'alreadyPaid',
            render: text => convertNumberPriceToNormalString(text)
        },
        {
            title: 'Пеня',
            dataIndex: 'penaltyFee',
            key: 'penaltyFee',
            render: text => convertNumberPriceToNormalString(text)
        },
        {
            title: 'Дата выставления',
            dataIndex: 'createdAt',
            key: 'createdAt',
            defaultSortOrder: "descend",
            sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
            render: text => convertDateTimmeStringToNormalString(text)
        },
        {
            title: 'Статус',
            dataIndex: 'isActual',
            key: 'isActual',
            render: (text, record) =>
                <Tag color={record.penaltyFee ? "red" : record.amountForPay === record.alreadyPaid ? "green" : text ? "blue" : "default"}>
                    {record.penaltyFee ? "Просрочен" : record.amountForPay === record.alreadyPaid ? "Оплачен" : text ? "Актуален" : "Неактуален"}
                </Tag>
        },
        {
            title: 'Дата оплаты',
            dataIndex: 'paidAt',
            key: 'paidAt',
            render: text => convertDateTimmeStringToNormalString(text)
        },
    ]
}

export default UserPaymentsTable;