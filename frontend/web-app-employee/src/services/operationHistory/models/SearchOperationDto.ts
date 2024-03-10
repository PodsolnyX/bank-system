import {CurrencyType} from "../../common/CurrencyType.ts";
import {OperationStatus, OperationType} from "./OperationDto.ts";

export type SearchOperationDto = {
    UserIds?: string[]
    AccountIds?: string[]
    LoanIds?: string[]
    CurrencyTypes?: CurrencyType[]
    OperationTypes?: OperationType[]
    OperationStatuses?: OperationStatus[]
}