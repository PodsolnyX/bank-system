import {Button, Table, Typography} from "antd";
import {ColumnsType} from "antd/es/table";
import {dataTariffs} from "../mocks/dataAccounts.ts";
import {PlusOutlined} from "@ant-design/icons";

const TariffsPage = () => {
    return (
        <div className={"w-full flex flex-col gap-5"}>
            <div className={"flex flex-col gap-3"}>
                <div className={"flex justify-between"}>
                    <Typography.Text className={"text-2xl text-lime-500"} strong>Тарифы по кредитам</Typography.Text>
                    <Button icon={<PlusOutlined/>}>Добавить</Button>
                </div>
                <Table dataSource={dataTariffs} columns={columns} bordered size={"small"}/>
            </div>
        </div>
    )
}

interface TariffData {
    key: string;
    name: string;
    rate: number
}

const columns: ColumnsType<TariffData> = [
    {
        title: 'Название',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Ставка',
        dataIndex: 'rate',
        key: 'rate',
        align: "end",
        render: (text: number) => `${text}%`

    }
];



export default TariffsPage;