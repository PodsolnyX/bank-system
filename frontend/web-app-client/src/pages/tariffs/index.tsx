import { Button, Typography } from 'antd'

const data = [
  { title: 'Тариф 1', rate: '5%' },
  { title: 'Тариф 2', rate: '7%' },
  { title: 'Тариф 3', rate: '10%' },
]

const { Title } = Typography

export const TariffsPage = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <Title level={1}>Выберите тариф</Title>
      <Button type='primary' className='mt-8'>
        Выбрать
      </Button>
    </div>
  )
}
