import {Button, Modal, Typography} from "antd";
import {useForm} from "react-hook-form";
import InputControl from "../../../components/input/InputControl.tsx";
import {validators} from "../../../shared/helpers/validators.ts";
import React from "react";
import {useTariffs} from "../hooks/useTariffs.ts";
import {CreateTariffDto} from "../../../services/tariff/models/CreateTariffDto.ts";
import InputNumberControl from "../../../components/input/InputNumberControl.tsx";

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
    } = useForm<CreateTariffDto>();

    const {create} = useTariffs();
    const onSubmit = (data: CreateTariffDto) => {
        create.mutateAsync(data)
            .then(() => {
                onCancel();
            })
    }

    return (
        <Modal
            open={open}
            onCancel={onCancel}
            title={"Добавить тариф"}
            footer={null}
        >
            <form onSubmit={handleSubmit(onSubmit)} className={"w-full flex flex-col gap-3"}>
                <div className={"flex flex-col gap-1"}>
                    <Typography.Text>Название</Typography.Text>
                    <InputControl name={"name"} control={control}
                                  rules={{
                                      required: validators.required,
                                  }}
                    />
                    <Typography.Text>Период в днях</Typography.Text>
                    <InputNumberControl name={"periodInDays"} control={control}
                                  rules={{
                                      required: validators.required,
                                  }}
                    />
                    <Typography.Text>Ставка</Typography.Text>
                    <InputNumberControl name={"interestRate"} control={control}
                                        rules={{
                                            required: validators.required,
                                        }}
                    />
                    {/*<Segmented*/}
                    {/*    options={['Клиент', 'Сотрудник']}*/}
                    {/*    value={isEmployee ? 'Сотрудник' : "Клиент"}*/}
                    {/*    onChange={(value) => setIsEmployee(*/}
                    {/*        value === "Сотрудник"*/}
                    {/*    )}*/}
                    {/*    className={"w-max mt-3"}*/}
                    {/*/>*/}
                    <Typography.Text type={"danger"}>{create.isError && "Ошибка"}</Typography.Text>
                </div>
                <Button htmlType={"submit"} className={"w-full"} type={"primary"} disabled={create.isPending}>Добавить</Button>
            </form>
        </Modal>
    )
}

export default AddUserModal