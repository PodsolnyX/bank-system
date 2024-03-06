import {useForm} from "react-hook-form";
import {GetProfileParamsDto} from "../../../services/auth/models/GetProfileParamsDto.ts";
import InputControl from "../../../components/input/InputControl.tsx";
import {Button, Typography} from "antd";
import {useLogin} from "../hooks/useLogin.ts";

const LoginPage = () => {

    const {
        handleSubmit,
        control
    } = useForm<GetProfileParamsDto>();

    const {mutate: login, isPending, isError} = useLogin();
    const onSubmit = (data: GetProfileParamsDto) => {
        login(data)
    }

    return (
        <div className={"w-full flex flex-col gap-5"}>
            <div className={"flex flex-col gap-3"}>
                <div className={"flex justify-between"}>
                    <Typography.Text className={"text-2xl text-lime-500"} strong>Вход</Typography.Text>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className={"w-full flex flex-col gap-3"}>
                    <div>
                        <Typography.Text className={"text-lg"} strong>Почта</Typography.Text>
                        <InputControl name={"mail"} control={control}
                                      placeholder={"user@email.com"}
                        />
                        <Typography.Text type={"danger"}>{isError && "Ошибка"}</Typography.Text>
                    </div>
                    <Button htmlType={"submit"} className={"w-full"} disabled={isPending}>Войти</Button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;