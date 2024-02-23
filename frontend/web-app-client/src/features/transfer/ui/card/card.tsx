import { Image } from 'shared'
import cash from 'assets/cash.svg'
import { Container } from 'shared/ui/atoms/container'
import { getTransferAssets } from 'features/transfer/lib'
import { useNavigate } from 'react-router-dom'
import { OperationType } from 'entities/operation'

export interface TransferProps {
  type: OperationType
}

export const Transfer = (props: TransferProps) => {
  const { type } = props
  const { arrow, route, title } = getTransferAssets(type)
  const navigate = useNavigate()

  const onClick = () => {
    navigate(route)
  }

  return (
    <Container
      className='w-[200px] h-[200px] md:w-[300px] md:h-[300px] flex flex-col items-center cursor-pointer'
      onClick={onClick}
    >
      <h2>{title}</h2>
      <div className='w-2/3'>
        <Image src={arrow} className='w-full' />
      </div>
      <Image
        src={cash}
        alt=''
        className='w-[65px] md:w-[100px] absolute bottom-[2px] right-[2px]'
      />
    </Container>
  )
}
