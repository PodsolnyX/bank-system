import { Image } from 'shared'
import logoSVG from 'assets/logo.svg'

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
