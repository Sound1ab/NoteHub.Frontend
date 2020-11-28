import React, { useEffect } from 'react'

export function useClickOutside(
  callback: () => void,
  ref?: React.Ref<HTMLElement>
) {
  useEffect(() => {
    if (typeof ref === 'function') return

    const closeMenu = (event: MouseEvent) => {
      if (!ref || ref.current?.contains(event.target as Element)) {
        return
      }
      callback()
    }

    const handleKeyPressed = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        callback()
      }
    }

    document.addEventListener('mousedown', closeMenu)
    document.addEventListener('keydown', handleKeyPressed)
    return () => {
      document.removeEventListener('mousedown', closeMenu)
      document.removeEventListener('keydown', handleKeyPressed)
    }
  }, [ref, callback])
}
