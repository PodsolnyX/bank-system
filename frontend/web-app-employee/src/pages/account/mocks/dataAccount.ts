import {AccountHistoryData} from "../ui/AccountPage.tsx";

const history: AccountHistoryData[] = [
    {
        key: '1',
        id: '0000-0000-0000-1000',
        date: '2023-01-01T00:00:00.000Z',
        type: "withdraw",
        status: "success",
        sum: 200.00
    },
    {
        key: '2',
        id: '0000-0000-0000-1001',
        date: '2023-01-02T00:00:00.000Z',
        type: "replenish",
        status: "error",
        sum: 500.00
    },
    {
        key: '3',
        id: '0000-0000-0000-1003',
        date: '2023-01-02T00:13:00.000Z',
        type: "replenish",
        status: "success",
        sum: 120.00
    },
    {
        key: '4',
        id: '0000-0000-0000-1004',
        date: '2023-01-05T12:13:56.000Z',
        type: "loanRepay",
        status: "inProcess",
        sum: 1800.00
    },
]

export const dataAccount = {
    id: "0000-0000-0000-0001",
    userName: "Артамонов Михаил Потапович",
    money: 1000,
    history: history
};