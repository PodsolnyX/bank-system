import { NavLink, NavLinkProps } from 'react-router-dom'

export const MenuLink = (props: NavLinkProps) => {
  return <NavLink className='text-sm mx-1 md:mx-2 md:text-base' {...props} />
}
