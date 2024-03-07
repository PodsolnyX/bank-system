import {Button, Table, Typography} from "antd";
import {ColumnsType} from "antd/es/table";
import {PlusOutlined} from "@ant-design/icons";
import {useTariffs} from "../hooks/useTariffs.ts";
import {TariffDto} from "../../../services/tariff/models/TariffDto.ts";
import AddTariffModal from "./AddTariffModal.tsx";
import {useState} from "react";

const TariffsPage = () => {

    const {get} = useTariffs();

    const {data} = get;

    const [open, setOpen] = useState(false);

    return (
        <div className={"w-full flex flex-col gap-5"}>
            <div className={"flex flex-col gap-3"}>
                <div className={"flex justify-between"}>
                    <Typography.Text className={"text-2xl text-lime-500"} strong>Тарифы по кредитам</Typography.Text>
                    <Button icon={<PlusOutlined/>} onClick={() => setOpen(true)}>Добавить</Button>
                </div>
                {
                    data &&
                    <Table dataSource={getData(data)} columns={columns} bordered size={"small"}/>
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
    rate: number
}

function getData(data: TariffDto[]) {
    return data.map(it => {
        return {
            key: it.id,
            name: it.name,
            id: it.id,
            rate: it.periodInDays
        }
    })
}

const columns: ColumnsType<TariffData> = [
    {
        title: 'Название',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: 'Ставка',
        dataIndex: 'rate',
        key: 'rate',
        align: "end",
        sorter: (a, b) => a.rate - b.rate,
        render: (text: number) => `${text}%`

    }
];



export default TariffsPage;