export interface MenuProps {
  leftSide?: JSX.Element[]
  rightSide?: JSX.Element[]
}

export const Menu = (props: MenuProps) => {
  const { leftSide, rightSide } = props

  return (
    <nav className='hidden w-full mx-2 md:mx-3 md:flex align-center select-none'>
      <div>{leftSide}</div>
      <div className='ml-auto'>{rightSide}</div>
    </nav>
  )
}
