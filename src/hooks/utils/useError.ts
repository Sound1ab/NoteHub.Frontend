import { useCallback } from 'react'

import { ErrorToast } from '../../components/atoms/Toast/Toast'

export function useError() {
  const withError = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <T extends any[]>(callback: (...args: T) => any, message: string) => {
      return async (...args: T) => {
        try {
          return await callback(...args)
        } catch (err) {
          if (err instanceof Error) {
            ErrorToast(`${message}: ${err.message}`)
          }
        }
      }
    },
    []
  )

  return {
    withError,
  }
}
