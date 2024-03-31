import {Button, Modal, Segmented, Typography} from "antd";
import {useForm} from "react-hook-form";
import InputControl from "../../../components/input/InputControl.tsx";
import {UserCreateDto} from "../../../services/auth/models/UserCreateDto.ts";
import {useUsers} from "../hooks/useUsers.ts";
import {validators} from "../../../shared/helpers/validators.ts";
import React, {useState} from "react";

interface AddUserModal {
    open: boolean,
    onCancel(): void
}

const AddUserModal = (props: AddUserModal) => {

    const {
        open,
        onCancel
    } = props;

    const {
        handleSubmit,
        control
    } = useForm<UserCreateDto>();

    const [isEmployee, setIsEmployee] = useState(false)

    const {createUser} = useUsers();
    const onSubmit = (data: UserCreateDto) => {
        createUser.mutateAsync({
            ...data,
            isEmployee
        })
            .then(() => {
                onCancel();
            })
    }

    return (
        <Modal
            open={open}
            onCancel={onCancel}
            title={"Добавить пользователя"}
            footer={null}
        >
            <form onSubmit={handleSubmit(onSubmit)} className={"w-full flex flex-col gap-3"}>
                <div className={"flex flex-col gap-1"}>
                    <Typography.Text>ФИО</Typography.Text>
                    <InputControl name={"name"} control={control}
                                  placeholder={"Иванов Иван Иванович"}
                                  rules={{
                                      required: validators.required
                                  }}
                    />
                    <Typography.Text>Почта</Typography.Text>
                    <InputControl name={"mail"} control={control}
                                  placeholder={"user@email.com"}
                                  rules={{
                                      required: validators.required,
                                      pattern: validators.emailPattern
                                  }}
                    />
                    <Segmented
                        options={['Клиент', 'Сотрудник']}
                        value={isEmployee ? 'Сотрудник' : "Клиент"}
                        onChange={(value) => setIsEmployee(
                            value === "Сотрудник"
                        )}
                        className={"w-max mt-3"}
                    />
                    <Typography.Text type={"danger"}>{createUser.isError && "Ошибка"}</Typography.Text>
                </div>
                <Button htmlType={"submit"} className={"w-full"} type={"primary"} disabled={createUser.isPending}>Добавить</Button>
            </form>
        </Modal>
    )
}

export default AddUserModal