import { BffRoutes, Microservices } from 'common/Microservices'
import { CBMicroservice } from 'middleware/CircuitBreaker/types'

export const mapBffRoute = (route: string) => {
  const mappings: Record<string, CBMicroservice> = {
    [BffRoutes.Account]: Microservices.Core,
    [BffRoutes.History]: Microservices.Operation,
    [BffRoutes.Loan]: Microservices.Loan,
    [BffRoutes.Tariff]: Microservices.Loan,
  }
  for (const key in mappings) {
    if (route.startsWith(key)) {
      return mappings[key]
    }
  }
  return undefined
}

export const mapUrl = (route: string) => {
  const mappings: Record<string, CBMicroservice> = {
    [Microservices.Core]: Microservices.Core,
    [Microservices.Loan]: Microservices.Loan,
    [Microservices.Operation]: Microservices.Operation,
  }
  for (const key in mappings) {
    if (route.startsWith(key)) {
      return mappings[key]
    }
  }
  return undefined
}
