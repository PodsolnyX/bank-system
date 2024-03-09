import { useState, useEffect } from 'react'

export const PageLoader = () => {
  const [dots, setDots] = useState(3)

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => ++prevDots)
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return <h1 className='loader'>Загрузка{'.'.repeat(dots % 4)}</h1>
}
