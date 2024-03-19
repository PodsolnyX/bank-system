import { Progress } from 'antd'
import type { ProgressProps } from 'antd'

const conicColors: ProgressProps['strokeColor'] = {
  '0%': '#87d068',
  '50%': '#ffe58f',
  '100%': '#ffccc7',
}

export interface RatingWidgetProps {
  current: number | undefined | null
  max: number | undefined | null
}

export const RatingWidget = ({ current, max }: RatingWidgetProps) => {
  const percent = current && max ? (100 * current) / max : undefined
  if (percent === undefined) {
    return <Progress type='dashboard' percent={100} status='exception' />
  }
  return (
    <Progress
      type='dashboard'
      percent={percent}
      strokeColor={conicColors}
      format={() => current}
    />
  )
}
