import {Button, Table, TableColumnsType, TableProps, Typography} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {dataClients} from "../mocks/DataClients.ts";
import {dataEmployee} from "../mocks/DataEmployees.ts";
import React from "react";

const UsersPage = () => {

    const onChange: TableProps<UserData>['onChange'] = (pagination, filters, sorter, extra) => {

    };

    return (
        <div className={"w-full flex flex-col gap-5"}>
            <div className={"flex flex-col gap-3"}>
                <div className={"flex justify-between"}>
                    <Typography.Text className={"text-2xl text-lime-500"} strong>Клиенты</Typography.Text>
                    <Button icon={<PlusOutlined/>}>Добавить</Button>
                </div>
                <Table
                    onChange={onChange}
                    dataSource={dataClients}
                    columns={columns}
                    bordered
                    size={"small"}
                />
            </div>
            <div className={"flex flex-col gap-3"}>
                <div className={"flex justify-between"}>
                    <Typography.Text className={"text-2xl text-lime-500"} strong>Сотрудники</Typography.Text>
                    <Button icon={<PlusOutlined/>}>Добавить</Button>
                </div>
                <Table dataSource={dataEmployee} columns={columns} bordered size={"small"}/>
            </div>
        </div>
    )
}

interface UserData {
    key: React.Key,
    name: string,
    email: string,
    isBanned: boolean
}

const columns: TableColumnsType<UserData> = [
    {
        title: 'ФИО',
        dataIndex: 'name',
        defaultSortOrder: "ascend",
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: 'Почта',
        dataIndex: 'email',
        sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
        title: 'Действия',
        dataIndex: '',
        width: '0',
        render: (_text: string, record: UserData) =>
            <Button danger={!record.isBanned} className={"w-full"} ghost type={"primary"} size={"small"}>
                {record.isBanned ? "Разбанить":"Забанить"}
            </Button>,
    },
];



export default UsersPage;