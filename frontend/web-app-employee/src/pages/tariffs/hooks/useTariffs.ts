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
        mutationFn: (data: CreateTariffDto) => tariffService.createTariff(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: tariffQueryKeys.tariffs() } )
        }
    })

    const remove = useMutation({
        mutationFn: (id: string) => tariffService.deleteTariff(id),
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