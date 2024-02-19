export interface MenuProps {
  leftSide?: JSX.Element[]
  rightSide?: JSX.Element[]
}

export const Menu = (props: MenuProps) => {
  const { leftSide, rightSide } = props

  return (
    <nav className='w-full mx-2 md:mx-3 flex align-center shimmer'>
      <div>{leftSide}</div>
      <div className='ml-auto'>{rightSide}</div>
    </nav>
  )
}
