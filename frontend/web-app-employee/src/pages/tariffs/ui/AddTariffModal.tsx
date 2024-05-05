import {Button, Modal, Select, Typography} from "antd";
import {useForm} from "react-hook-form";
import InputControl from "../../../components/input/InputControl.tsx";
import {validators} from "../../../shared/helpers/validators.ts";
import React, {useState} from "react";
import {useTariffs} from "../hooks/useTariffs.ts";
import {CreateTariffDto} from "../../../services/tariff/models/CreateTariffDto.ts";
import InputNumberControl from "../../../components/input/InputNumberControl.tsx";
import {CurrencyType} from "../../../services/common/CurrencyType.ts";

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

    const [currency, setCurrency] = useState<CurrencyType[]>([CurrencyType.Rub]);
    const onSubmit = (data: CreateTariffDto) => {
        const key = crypto.randomUUID();
        create.mutateAsync({data: {...data, currencyTypes: currency}, key})
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
                    <div className={"grid grid-cols-2 gap-3"}>
                        <div>
                            <Typography.Text>Период</Typography.Text>
                            <InputNumberControl name={"periodInDays"} control={control}
                                                className={"w-full"}
                                                addonAfter="дней"
                                                rules={{
                                                    required: validators.required,
                                                }}
                            />
                        </div>
                        <div>
                            <Typography.Text>Ставка</Typography.Text>
                            <InputNumberControl name={"interestRate"} control={control}
                                                className={"w-full"}
                                                addonAfter="%"
                                                rules={{
                                                    required: validators.required,
                                                }}
                            />
                        </div>
                    </div>
                    <Typography.Text>Валюты</Typography.Text>
                    <Select
                        mode={"tags"}
                        onChange={value => setCurrency(value)}
                        value={currency}
                        options={[
                            {
                                value: CurrencyType.Rub,
                                label: CurrencyType.Rub.toUpperCase()
                            },
                            {
                                value: CurrencyType.Usd,
                                label: CurrencyType.Usd.toUpperCase()
                            },
                            {
                                value: CurrencyType.Eur,
                                label: CurrencyType.Eur.toUpperCase()
                            }
                        ]}
                    />
                    <Typography.Text type={"danger"}>{create.isError && "Ошибка"}</Typography.Text>
                </div>
                <Button htmlType={"submit"} className={"w-full"} type={"primary"} disabled={create.isPending}>Добавить</Button>
            </form>
        </Modal>
    )
}

export default AddUserModal