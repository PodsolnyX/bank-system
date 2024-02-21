import { Menu, Button, Dropdown as AntdDropdown } from 'antd'
import type { ItemType } from 'antd/lib/menu/hooks/useItems'
export interface DropdownProps {
  items: ItemType[]
  [key: string]: any
}

export type DropdownItemDescr = {
  label: string
  isVisible: boolean
  link: string
}

export const Dropdown = (props: DropdownProps) => {
  const { items, ...rest } = props

  return (
    <AntdDropdown {...rest} dropdownRender={() => <Menu items={items} />}>
      <Button>⚙️</Button>
    </AntdDropdown>
  )
}
