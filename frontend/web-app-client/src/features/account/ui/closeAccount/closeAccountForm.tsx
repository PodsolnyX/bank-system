import { Button } from 'antd'
import { Form, FormProps } from 'shared/ui'
import { useEffect, useState } from 'react'

export type CloseAccountFormProps = {
  onFinish: () => void
  account: string
} & FormProps

export const CloseAccountForm = (props: CloseAccountFormProps) => {
  const { onFinish, account, ...rest } = props
  const [time, setTime] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      if (time <= 0) clearInterval(timer)
      setTime((time) => Math.max(time - 1, 0))
    }, 1000)
    return () => clearInterval(timer)
  })

  return (
    <Form {...rest} onFinish={onFinish} className='w-2/3 md:w-1/3'>
      <h2 className='text-center'>Подтвердите закрытие</h2>
      <h3 className='text-center'>Это действие невозможно отменить!</h3>
      <h3 className='text-center'>Номер счета: {account}</h3>

      <Button
        disabled={time > 0}
        danger
        className='float-right'
        type='primary'
        htmlType='submit'
      >
        {time ? `Закрыть (${time})` : `Закрыть`}
      </Button>
    </Form>
  )
}
