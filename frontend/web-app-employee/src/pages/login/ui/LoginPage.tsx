import {Typography} from "antd";

const LoginPage = () => {

    return (
        <div className={"w-full flex flex-col gap-5"}>
            <div className={"flex flex-col gap-3"}>
                <div className={"flex justify-between"}>
                    <Typography.Text className={"text-2xl text-lime-500"} strong>Авторизация...</Typography.Text>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;