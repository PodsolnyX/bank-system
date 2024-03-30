import {Badge, Table, Tag, Tooltip} from "antd";
import {AccountDto} from "../../../services/account/models/AccountDto.ts";
import {ColumnsType} from "antd/es/table";
import {generatePath, Link} from "react-router-dom";
import {Links} from "../../../constants/Links.ts";
import {convertNumberPriceToNormalString} from "../../../shared/helpers/stringHelpers.ts";
import React from "react";

interface AccountsTableProps {
    loading?: boolean,
    data?: AccountDto[],
    columns?: ColumnsFilter,
    pageSize?: number
}

interface ColumnsFilter {
    name: boolean
}

const AccountsTable = (props: AccountsTableProps) => {

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

const getData = (data?: AccountDto[]) => {
    if (!data || !data.length) return [];
    return data.map(it => {
        return {
            key: it.id,
            userName: it.userName || "",
            id: it.id,
            amount: it.amount,
            currencyType: it.currencyType,
            isClosed: !!it.closedAt,
            userId: it.userId,
            isPriority: it.isPriority
        }
    })
}

interface AccountData {
    key: string;
    userName: string;
    userId: string,
    id: string;
    amount: number;
    currencyType: string,
    isClosed: boolean,
    isPriority: boolean
}

function getTableColumns(filter?: ColumnsFilter): ColumnsType<AccountData> {

    const columns:ColumnsType<AccountData> = [];

    if (filter?.name) columns.push({
        title: 'ФИО',
        dataIndex: 'userName',
        key: 'userName',
        sorter: (a, b) => a.userName.localeCompare(b.userName),
        render: (text, record) =>
            <Link to={generatePath(Links.UserInfo, {id: record.userId})}>
                {record.userId === "00000000-0000-0000-0000-000000000000" ? "МАСТЕР-СЧЁТ" : text }
            </Link>
    })

    return [
        ...columns,
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id.localeCompare(b.id),
            render: (text: string, record) =>
                <Link to={generatePath(Links.Account, {id:text})}>
                    {text}
                    {
                        record.isPriority ? <Tooltip title={"Приоритетный счёт"}><Badge color={"green"} status={"processing"} className={"ml-2"}/></Tooltip> : undefined
                    }
                </Link>
        },
        {
            title: 'Статус',
            dataIndex: 'isClosed',
            key: 'isClosed',
            width: "0px",
            render: (text: boolean) => <Tag color={text ? "red" : "green"}>{text ? "Закрыт" : "Открыт"}</Tag>
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
    ]
}

export default AccountsTable;