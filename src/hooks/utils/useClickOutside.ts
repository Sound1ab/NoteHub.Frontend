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

    document.addEventListener('mousedown', closeMenu)
    return () => {
      document.removeEventListener('mousedown', closeMenu)
    }
  }, [ref, callback])
}
