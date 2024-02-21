import { Image } from 'shared'
import { Container } from 'shared/ui/atoms/container'
import { useNavigate } from 'react-router-dom'

export interface MenuCardProps {
  icon: string
  title: string
  link: string
}

export const MenuCard = (props: MenuCardProps) => {
  const { icon, title, link } = props
  const navigate = useNavigate()

  const onClick = () => {
    navigate(link)
  }

  return (
    <Container
      className='w-[200px] h-[150px] md:w-[300px] md:h-[250px] flex flex-col items-center cursor-pointer'
      onClick={onClick}
    >
      <h2>{title}</h2>
      <div className='w-2/3'>
        <Image src={icon} className='w-full' />
      </div>
    </Container>
  )
}
