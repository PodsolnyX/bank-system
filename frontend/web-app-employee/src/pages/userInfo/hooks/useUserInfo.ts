import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import authService from "../../../services/auth/AuthService.ts";
import {authQueryKeys} from "../../../services/auth/authQueryKeys.ts";

export function useUserInfo() {

    const {id} = useParams()

    return useQuery({
        queryKey: authQueryKeys.userInfo(id),
        queryFn: () => authService.getUserInfo(id || ""),
        select: ({data}) => data,
        enabled: !!id
    })
}