import { Link } from 'react-router-dom'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { Credit } from 'shared/entities'
import { getCreditLink, getCreditRepayLink } from 'shared/const'

export const getDropdownItemsDescr = (credit: Credit): ItemType[] => [
  {
    label: <Link to={getCreditLink(credit.id)}>Инфо</Link>,
    disabled: false,
    key: 'info',
  },
  {
    label: <Link to={getCreditRepayLink(credit.id)}>Погасить</Link>,
    disabled: credit.currentAmount <= 0,
    key: 'deposit',
  },
]
