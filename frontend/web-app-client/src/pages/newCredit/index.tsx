import { Button, Typography } from 'antd'
const { Title } = Typography

export const NewCreditPage = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <Title level={1}>Выберите тариф</Title>
      <Button type='primary' className='mt-8'>
        Выбрать
      </Button>
    </div>
  )
}
