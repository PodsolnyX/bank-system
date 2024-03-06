import {useMutation} from "@tanstack/react-query";
import authService from "../../../services/auth/AuthService.ts";
import {GetProfileParamsDto} from "../../../services/auth/models/GetProfileParamsDto.ts";
import {useAuth} from "../../../app/providers/auth";

export function useLogin() {

    const {signIn} = useAuth();

    return useMutation({
        mutationFn: (data: GetProfileParamsDto) => authService.getProfile(data),
        onSuccess: ({data}) => {
            signIn(data.mail)
        }
    })
}