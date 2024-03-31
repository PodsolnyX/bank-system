import { ReactNode } from 'react'

export interface CommonProps {
  children?: ReactNode
  className?: string
  [x: string]: any
}
