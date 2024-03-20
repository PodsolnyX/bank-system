import logoSVG from 'shared/assets/logo.svg'
import { Image } from 'shared/ui'

export interface LogoProps {
  [propKey: string]: any
}

export const Logo = (props: LogoProps) => {
  return (
    <Image
      {...props}
      className='w-[30px] h-[30px] md:w-[40px] md:h-[40px] mx-1'
      src={logoSVG}
      alt='Зеленый банк'
    />
  )
}
