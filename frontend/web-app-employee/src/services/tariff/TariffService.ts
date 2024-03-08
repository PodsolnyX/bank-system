import {instance} from "../../api/instance.ts";
import {TariffDto} from "./models/TariffDto.ts";
import {CreateTariffDto} from "./models/CreateTariffDto.ts";

class TariffService {
    async getTariffs() {
        return instance.get<TariffDto[]>(`/tariff/user`)
    }

    async createTariff(data: CreateTariffDto) {
        return instance.post(`/tariff/user`, data)
    }

    async deleteTariff(id: string) {
        return instance.delete(`/tariff/user/${id}`)
    }
}

const tariffService = new TariffService();

export default tariffService;