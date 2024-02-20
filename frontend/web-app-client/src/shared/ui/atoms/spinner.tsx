import cs from 'classnames'
import { Center } from 'shared/ui'
export const Spinner = () => {
  const cls = 'w-[30px] h-[30px] m-1 rounded-full'

  return (
    <Center>
      <div className={cs(cls, 'bg-[#0F8] animate-[pulse_1s_infinite_100ms]')}></div>
      <div className={cs(cls, 'bg-[#0E8] animate-[pulse_1s_infinite_300ms]')}></div>
      <div className={cs(cls, 'bg-[#0D8] animate-[pulse_1s_infinite_500ms]')}></div>
    </Center>
  )
}
