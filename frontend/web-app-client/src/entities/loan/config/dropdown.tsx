import { Link } from 'react-router-dom'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { Loan } from 'shared/entities'
import { getLoanLink, getLoanRepayLink } from 'shared/const'

export const getLoanActions = (loan: Loan): ItemType[] => [
  {
    label: <Link to={getLoanLink(loan.id)}>Инфо</Link>,
    disabled: false,
    key: 'info',
  },
  {
    label: <Link to={getLoanRepayLink(loan.id)}>Погасить</Link>,
    disabled: loan.debt <= 0,
    key: 'deposit',
  },
]
