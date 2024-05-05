import {instance} from "../../shared/api/instance.ts";
import {TariffDto} from "./models/TariffDto.ts";
import {CreateTariffDto} from "./models/CreateTariffDto.ts";

class TariffService {
    async getTariffs() {
        return instance.get<TariffDto[]>(`/tariff/user`)
    }

    async createTariff(data: CreateTariffDto, key: string) {
        return instance.post(`/tariff/user`, data, {
            headers: { "X-Idempotency-Key": key }
        })
    }

    async deleteTariff(id: string, key: string) {
        return instance.delete(`/tariff/user/${id}`, {
            headers: { "X-Idempotency-Key": key }
        })
    }
}

const tariffService = new TariffService();

export default tariffService;