import {Table} from "antd";
import {
    convertDateTimmeStringToNormalString,
    convertNumberPriceToNormalString
} from "../../../shared/helpers/stringHelpers.ts";
import {CurrencyType} from "../../../services/common/CurrencyType.ts";
import {LoanDto} from "../../../services/loan/models/LoanDto.ts";
import {ColumnsType} from "antd/es/table";
import {generatePath, Link} from "react-router-dom";
import {Links} from "../../../constants/Links.ts";

interface LoansTableProps {
    loading?: boolean,
    data?: LoanDto[],
    columns?: ColumnsFilter,
    pageSize?: number
}

interface ColumnsFilter {
    name: boolean
}

const LoansTable = (props: LoansTableProps) => {

    const {
        loading,
        data,
        columns,
        pageSize = 20
    } = props;

    return (
        <Table
            loading={loading}
            dataSource={getData(data)}
            // @ts-ignore
            columns={getTableColumns(columns)}
            bordered
            size={"small"}
            className={"w-full"}
            pagination={{
                pageSize
            }}
        />
    )
}

const getData = (data?: LoanDto[]) => {
    if (!data || !data.length) return [];
    return data.map(it => {
        return {
            key: it.id,
            userName: it.userId,
            id: it.id,
            debt: it.debt,
            currencyType: it.currencyType,
            lastChargeDate: it.lastChargeDate,
            tariff: it.tariff.name,
            rate: it.tariff.interestRate,
            period: it.tariff.periodInDays,
            accountId: it.accountId
        }
    })
}

interface LoanData {
    key: string;
    userName: string;
    id: string;
    accountId: string,
    debt: number;
    lastChargeDate: string,
    currencyType: CurrencyType,
    tariff: string,
    rate: number,
    period: number
}

function getTableColumns(filter?: ColumnsFilter): ColumnsType<LoanData> {

    const columns:ColumnsType<LoanData> = [];

    if (filter?.name) columns.push({
        title: 'ФИО',
        dataIndex: 'userName',
        key: 'userName',
        sorter: (a, b) => a.userName.localeCompare(b.userName),
    })

    return [
        ...columns,
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id.localeCompare(b.id),
            render: text => <Link to={generatePath(Links.Loan, {id:text})}>{text}</Link>
        },
        {
            title: 'ID счета',
            dataIndex: 'accountId',
            key: 'accountId',
            sorter: (a, b) => a.accountId.localeCompare(b.accountId),
            render: text => <Link to={generatePath(Links.Account, {id:text})}>{text}</Link>
        },
        {
            title: 'Тариф',
            dataIndex: 'tariff',
            key: 'tariff',
        },
        {
            title: 'Ставка',
            dataIndex: 'rate',
            key: 'rate',
            render: text => `${text}%`
        },
        {
            title: 'Период',
            dataIndex: 'period',
            key: 'period',
            render: text => `${text} дней`
        },
        {
            title: 'Последний платеж',
            dataIndex: 'lastChargeDate',
            key: 'lastChargeDate',
            sorter: (a, b) => a.currencyType.localeCompare(b.currencyType),
            render: text => convertDateTimmeStringToNormalString(text)
        },
        {
            title: 'Долг',
            dataIndex: 'debt',
            key: 'debt',
            align: "end",
            sorter: (a, b) => a.debt - b.debt,
            render: (text: number) => convertNumberPriceToNormalString(text) || 0
        },
        {
            title: 'Валюта',
            dataIndex: 'currencyType',
            key: 'currencyType',
            width: "0px",
            align: "center",
            render: text => text.toUpperCase()
        },

    ]
}

export default LoansTable;