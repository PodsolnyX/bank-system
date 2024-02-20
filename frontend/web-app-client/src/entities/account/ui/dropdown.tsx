import { Menu, Button, Dropdown as AntdDropdown } from 'antd'
import { Link } from 'react-router-dom'

export interface DropdownProps {
  items: DropdownItemDescr[]
  [key: string]: any
}

export type DropdownItemDescr = {
  label: string
  isVisible: boolean
  link: string
}

type DropdownItemProps = {
  description: DropdownItemDescr
}

const DropdownItem = ({ description }: DropdownItemProps) => {
  if (!description.isVisible) {
    return null
  }

  return (
    <Menu.Item className='bg-white hover:bg-gray-100'>
      <Link to={description.link}>{description.label}</Link>
    </Menu.Item>
  )
}

export const Dropdown = (props: DropdownProps) => {
  const { items, ...rest } = props

  return (
    <AntdDropdown
      {...rest}
      overlay={() => (
        <Menu>
          {items.map((item, index) => (
            <DropdownItem description={item} key={index} />
          ))}
        </Menu>
      )}
    >
      <Button>⚙️</Button>
    </AntdDropdown>
  )
}
