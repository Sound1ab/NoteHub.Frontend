import { useCallback, useState } from 'react'

export function useLoading() {
  const [loading, setLoading] = useState(false)

  const withLoading = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <T extends any[]>(callback: (...args: T) => any) => {
      return async (...args: T) => {
        setLoading(true)
        await callback(...args)
        setLoading(false)
      }
    },
    []
  )

  return {
    loading,
    withLoading,
  }
}
