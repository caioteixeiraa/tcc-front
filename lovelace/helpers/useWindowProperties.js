
import { useEffect, useState } from 'react'

export const useWindowProperties = () => {
  const [windowProperties, setWindowProperties] = useState({
    width: undefined,
    height: undefined,
    isMobile: undefined,
    isDesktop: undefined,
  })

  const handleResize = () => {
    setWindowProperties({
      width: window.innerWidth,
      height: window.innerHeight,
      isMobile: window.innerWidth < 450,
      isDesktop: window.innerWidth > 800,
    })
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowProperties
}