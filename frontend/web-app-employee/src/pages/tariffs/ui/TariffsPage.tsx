import {Button, Popconfirm, Table, Tag, Typography} from "antd";
import {ColumnsType} from "antd/es/table";
import {PlusOutlined} from "@ant-design/icons";
import {useTariffs} from "../hooks/useTariffs.ts";
import {TariffDto} from "../../../services/tariff/models/TariffDto.ts";
import AddTariffModal from "./AddTariffModal.tsx";
import React, {useState} from "react";
import {CurrencyType} from "../../../services/common/CurrencyType.ts";

const TariffsPage = () => {

    const {get, remove} = useTariffs();

    const {data} = get;

    const [open, setOpen] = useState(false);

    const getTableColumns = () : ColumnsType<TariffData> => {
        return [
            {
                title: 'Название',
                dataIndex: 'name',
                key: 'name',
                sorter: (a, b) => a.name.localeCompare(b.name),
            },
            {
                title: 'Период',
                dataIndex: 'period',
                key: 'period',
                sorter: (a, b) => a.rate - b.rate,
                render: (text: number) => `${text} дней`

            },
            {
                title: 'Валюты',
                dataIndex: 'currencyTypes',
                key: 'currencyTypes',
                align: "center",
                render: (_, { currencyTypes }) => (
                    <>
                        {currencyTypes.map((it) => {
                            return (
                                <Tag color={"default"} key={it}>
                                    {it.toUpperCase()}
                                </Tag>
                            );
                        })}
                    </>
                )
            },
            {
                title: 'Ставка',
                dataIndex: 'rate',
                key: 'rate',
                align: "end",
                sorter: (a, b) => a.rate - b.rate,
                render: (text: number) => `${text}%`
            },
            {
                title: 'Действия',
                dataIndex: '',
                width: '0',
                render: (_text: string, record: TariffData) =>
                    <Popconfirm
                        title={"Вы уверены?"}
                        onConfirm={() => {
                            const key = crypto.randomUUID();
                            remove.mutate({id: record.id, key})
                        }}
                    >
                        <Button
                            danger={true}
                            className={"w-full"}
                            ghost
                            type={"primary"}
                            size={"small"}
                        >
                            Удалить
                        </Button>
                    </Popconfirm>

            }
        ]
    }

    return (
        <div className={"w-full flex flex-col gap-5"}>
            <div className={"flex flex-col gap-3"}>
                <div className={"flex justify-between"}>
                    <Typography.Text className={"text-2xl text-lime-500"} strong>Тарифы по кредитам</Typography.Text>
                    <Button icon={<PlusOutlined/>} onClick={() => setOpen(true)}>Добавить</Button>
                </div>
                {
                    data &&
                    <Table dataSource={getData(data)} columns={getTableColumns()} bordered size={"small"}/>
                }
            </div>
            <AddTariffModal open={open} onCancel={() => setOpen(false)}/>
        </div>
    )
}

interface TariffData {
    key: string;
    id: string,
    name: string;
    rate: number,
    period: number,
    currencyTypes: CurrencyType[]
}

function getData(data: TariffDto[]) {
    return data.map(it => {
        return {
            key: it.id,
            name: it.name,
            id: it.id,
            rate: it.interestRate,
            period: it.periodInDays,
            currencyTypes: it.currencyTypes
        }
    })
}


export default TariffsPage;