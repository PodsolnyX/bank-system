import { useNavigate } from 'react-router-dom'
import { Image, Container } from 'shared/ui'

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
      className='w-[180px] h-[150px] md:w-[280px] md:h-[250px] flex flex-col items-center cursor-pointer'
      onClick={onClick}
    >
      <h2>{title}</h2>
      <div className='w-2/3'>
        <Image src={icon} className='w-full' />
      </div>
    </Container>
  )
}
