import cs from 'classnames'
export const Spinner = () => {
  const cls = 'w-[30px] h-[30px] m-1 rounded-full'

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className={cs(cls, 'bg-[#0F8] animate-[pulse_1s_infinite_100ms]')}></div>
      <div className={cs(cls, 'bg-[#0E8] animate-[pulse_1s_infinite_300ms]')}></div>
      <div className={cs(cls, 'bg-[#0D8] animate-[pulse_1s_infinite_500ms]')}></div>
    </div>
  )
}
