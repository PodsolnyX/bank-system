import {AxiosError, AxiosResponse} from "axios";
import {instance} from "./instance.ts";
import {App} from "antd";


export const useSetupInstanceInterceptors = () => {

    const { message } = App.useApp();

    const onResponse = (response: AxiosResponse): AxiosResponse => {
        return response;
    }

    const onResponseError = (error: AxiosError): Promise<AxiosError> => {
        onInternalServerError(error);
        return Promise.reject(error);
    }


    const onInternalServerError = (error: AxiosError) => {
        if (error.response?.status === 500) message.info("Ой, что-то пошло не так :(")
    }

    instance.interceptors.response.use(onResponse, onResponseError);
}