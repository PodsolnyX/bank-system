import {Button, Input, Popconfirm, Segmented, Spin, Table, TableColumnsType, TableProps, Typography} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import React from "react";
import {useUsers} from "../hooks/useUsers.ts";
import {UserDto} from "../../../services/auth/models/UserDto.ts";

const UsersPage = () => {

    const {
        getUsers,
        banUser,
        params,
        setParams
    } = useUsers();

    const { data } = getUsers;
    const onChange: TableProps<UserData>['onChange'] = (pagination, filters, sorter, extra) => {
        // console.log(pagination, filters, sorter, extra)
    };

    function getTableColumns(): TableColumnsType<UserData> {
        return [
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
                    <Popconfirm
                        title={"Вы уверены?"}
                        onConfirm={() => banUser.mutate(record.id)}
                    >
                        <Button
                            danger={!record.isBanned}
                            className={"w-full"}
                            ghost
                            type={"primary"}
                            size={"small"}
                        >
                            {record.isBanned ? "Разбанить":"Забанить"}
                        </Button>
                    </Popconfirm>

            },
        ];
    }

    return (
        <div className={"w-full flex flex-col gap-5"}>
            <div className={"flex flex-col gap-3"}>
                <div className={"flex justify-between"}>
                    <Typography.Text className={"text-2xl text-lime-500"} strong>Пользователи</Typography.Text>
                    <Button icon={<PlusOutlined/>}>Добавить</Button>
                </div>
                <div className={"flex gap-2"}>
                    <Input.Search
                        value={params.name}
                        onChange={(e) => setParams({
                            ...params,
                            name: e.currentTarget.value
                        })}
                        placeholder={"Имя пользователя"}
                    />
                    <Segmented
                        options={['Клиенты', 'Сотрудники']}
                    />
                    <Segmented
                        options={['Активные', 'Заблокированные']}
                        value={params.isBanned ? 'Заблокированные' : "Активные"}
                        onChange={(value) => setParams({
                            ...params,
                            isBanned: value === "Заблокированные"
                        })}
                    />
                </div>
                {
                    !data ? <Spin/> :
                        <Table
                            dataSource={getTableData(data)}
                            columns={getTableColumns()}
                            bordered
                            onChange={onChange}
                            pagination={{
                                pageSize: 20
                            }}
                            size={"small"}
                        />
                }
            </div>
        </div>
    )
}

function getTableData(data: UserDto[]) {
    return data.map(it => {
        return {
            key: it.id,
            id: it.id,
            name: it.name,
            email: it.mail,
            isBanned: !!it.bannedAt
        }
    })
}



interface UserData {
    key: React.Key,
    id: string,
    name: string,
    email: string,
    isBanned: boolean
}





export default UsersPage;