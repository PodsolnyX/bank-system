import { OperationType } from 'shared/entities'
import { TransferForm } from 'features/transfer'

export interface OperationPageProps {
  type: OperationType
}

export const OperationPage = (props: OperationPageProps) => {
  const { type } = props
  return <TransferForm type={type} />
}
