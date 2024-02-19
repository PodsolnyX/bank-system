import { useMemo } from 'react'
import { MenuLink } from 'shared'
import { MenuLinkDescription } from 'widgets/header/config'

export const useMenuLinkMap = (linksDescr: MenuLinkDescription[]) => {
  const links = useMemo(() => {
    return linksDescr.map((link, index) => (
      <MenuLink to={link.to} key={index}>
        {link.label}
      </MenuLink>
    ))
  }, [linksDescr])
  return links
}
