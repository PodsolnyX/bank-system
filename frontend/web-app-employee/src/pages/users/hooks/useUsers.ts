import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import authService from "../../../services/auth/AuthService.ts";
import {authQueryKeys} from "../../../services/auth/authQueryKeys.ts";
import {useState} from "react";
import {SearchUsersDto} from "../../../services/auth/models/SearchUsersDto.ts";
import {Pagination} from "../../../services/common/Pagination.ts";

export function useUsers() {

    const queryClient = useQueryClient();

    const [params, setParams]
        = useState<Pagination<SearchUsersDto>>({
        isBanned: false,
        Offset: 1
    })

    const getUsers = useQuery({
        queryKey: authQueryKeys.users(params),
        queryFn: () => authService.getUsers(params),
        select: ({data}) => data
    })

    const banUser = useMutation({
        mutationFn: (id: string) => authService.banUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: authQueryKeys.users({}) } )
        }
    })

    return {
        getUsers,
        banUser,
        params,
        setParams
    }
}