import { Alert } from 'antd'
import { Link } from 'react-router-dom'
import { Center } from 'shared/ui/atoms'

export interface ErrorMsgProps {
  text: string
  link: string
  linkText: string
}

export const ErrorMsg = (props: ErrorMsgProps) => {
  return (
    <Center>
      <Alert
        showIcon
        className='w-2/3'
        type='error'
        message={
          <>
            <div className='text-red-500'>{props.text}</div>
            <Link to={props.link}>{props.linkText}</Link>
          </>
        }
      />
    </Center>
  )
}
