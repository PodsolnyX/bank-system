import { OperationType } from 'entities/operation'
import { TransferForm } from 'features/transfer/ui/form'

export interface OperationPageProps {
  type: OperationType
}

export const OperationPage = (props: OperationPageProps) => {
  const { type } = props
  return <TransferForm type={type} />
}
