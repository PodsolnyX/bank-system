import { PropsWithChildren } from 'react'

export const Center = ({ children }: PropsWithChildren) => {
  return <div className='w-full h-full flex justify-center items-center'>{children}</div>
}
