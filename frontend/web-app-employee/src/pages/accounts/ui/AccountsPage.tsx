import {Typography} from "antd";
import {useAccounts} from "../hooks/useAccounts.ts";
import AccountsTable from "./AccountsTable.tsx";

const AccountsPage = () => {

    const {data, isLoading} = useAccounts();

    return (
        <div className={"w-full flex flex-col gap-5"}>
            <div className={"flex flex-col gap-3"}>
                <div className={"flex justify-between"}>
                    <Typography.Text className={"text-2xl text-lime-500"} strong>Счета</Typography.Text>
                </div>
                <AccountsTable data={data} loading={isLoading} columns={{name: true}}/>
            </div>
        </div>
    )
}





export default AccountsPage;