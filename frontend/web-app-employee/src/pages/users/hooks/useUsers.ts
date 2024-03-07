import {useQuery} from "@tanstack/react-query";
import authService from "../../../services/auth/AuthService.ts";
import {authQueryKeys} from "../../../services/auth/authQueryKeys.ts";

export function useUsers() {
    return useQuery({
        queryKey: authQueryKeys.users(),
        queryFn: () => authService.getUsers(),
        select: ({data}) => data
    })
}