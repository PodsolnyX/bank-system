import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import authService from "../../../services/auth/AuthService.ts";
import {authQueryKeys} from "../../../services/auth/authQueryKeys.ts";
import {useState} from "react";
import {SearchUsersDto} from "../../../services/auth/models/SearchUsersDto.ts";
import {Pagination} from "../../../services/common/Pagination.ts";
import {UserCreateDto} from "../../../services/auth/models/UserCreateDto.ts";

export function useUsers() {

    const queryClient = useQueryClient();

    const [params, setParams]
        = useState<Pagination<SearchUsersDto>>({
        isBanned: false,
        isEmployee: false
    })

    const getUsers = useQuery({
        queryKey: authQueryKeys.users(params),
        queryFn: () => authService.getUsers(params),
        select: ({data}) => data
    })

    const createUser = useMutation({
        mutationFn: (data: {data: UserCreateDto, key: string}) => authService.createUser(data.data, data.key),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: authQueryKeys.users({}) } )
        }
    })

    const banUser = useMutation({
        mutationFn: (data: {id: string, key: string}) => authService.banUser(data.id, data.key),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: authQueryKeys.users({}) } )
        }
    })

    const unbanUser = useMutation({
        mutationFn: (data: {id: string, key: string}) => authService.unbanUser(data.id, data.key),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: authQueryKeys.users({}) } )
        },
        retry: 3
    })

    return {
        getUsers,
        banUser,
        unbanUser,
        createUser,
        params,
        setParams
    }
}