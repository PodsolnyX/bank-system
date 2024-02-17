import {Button, Table, Typography} from "antd";
import {PlusOutlined} from "@ant-design/icons";

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

type UserData = {
    key: string,
    name: string,
    email: string,
    isBanned: boolean
}

const dataClients = [
    {
        key: '1',
        name: 'Артамонов Михаил Потапович',
        email: "arta222@mail.ru",
        isBanned: false
    },
    {
        key: '2',
        name: 'Усов Никита Никитич',
        email: "usov2001@mail.ru",
        isBanned: true
    },
];

const dataEmployee = [
    {
        key: '1',
        name: 'Зубенко Михаил Петрович',
        email: "zubenko1989@mail.ru",
        isBanned: false
    },
    {
        key: '2',
        name: 'Жадин Олег Тинович',
        email: "tinkoff@gmail.com",
        isBanned: false
    },
];

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
            <Button danger={!record.isBanned} className={"w-full"} ghost type={"primary"}>
                {record.isBanned ? "Разбанить":"Забанить"}
            </Button>,
    },
];



export default UsersPage;