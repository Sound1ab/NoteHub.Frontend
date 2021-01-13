export const debounce = (fn: (...rest: unknown[]) => void) => (
  ...args: unknown[]
) => fn(...args)
