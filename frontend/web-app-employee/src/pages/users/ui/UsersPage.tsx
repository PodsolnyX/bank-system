import {Button, Table, Typography} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {dataClients} from "../mocks/DataClients.ts";
import {dataEmployee} from "../mocks/DataEmployees.ts";

const UsersPage = () => {
    return (
        <div className={"w-full flex flex-col gap-5"}>
            <div className={"flex flex-col gap-3"}>
                <div className={"flex justify-between"}>
                    <Typography.Text className={"text-2xl text-lime-500"} strong>Клиенты</Typography.Text>
                    <Button icon={<PlusOutlined/>}>Добавить</Button>
                </div>
                <Table dataSource={dataClients} columns={columns} bordered size={"small"}/>
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
    key: string,
    name: string,
    email: string,
    isBanned: boolean
}

const columns = [
    {
        title: 'ФИО',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Почта',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Действия',
        dataIndex: '',
        key: 'ban',
        width: '0',
        render: (_text: string, record: UserData) =>
            <Button danger={!record.isBanned} className={"w-full"} ghost type={"primary"} size={"small"}>
                {record.isBanned ? "Разбанить":"Забанить"}
            </Button>,
    },
];



export default UsersPage;