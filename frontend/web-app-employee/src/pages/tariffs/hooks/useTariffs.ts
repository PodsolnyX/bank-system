import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {tariffQueryKeys} from "../../../services/tariff/tariffQueryKeys.ts";
import tariffService from "../../../services/tariff/TariffService.ts";
import {CreateTariffDto} from "../../../services/tariff/models/CreateTariffDto.ts";

export function useTariffs() {

    const queryClient = useQueryClient();

    const get = useQuery({
        queryKey: tariffQueryKeys.tariffs(),
        queryFn: () => tariffService.getTariffs(),
        select: ({data}) => data
    })

    const create = useMutation({
        mutationFn: (data: {data: CreateTariffDto, key: string}) => tariffService.createTariff(data.data, data.key),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: tariffQueryKeys.tariffs() } )
        }
    })

    const remove = useMutation({
        mutationFn: (data: {id: string, key: string}) => tariffService.deleteTariff(data.id, data.key),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: tariffQueryKeys.tariffs() } )
        }
    })

    return {
        get,
        create,
        remove
    }
}