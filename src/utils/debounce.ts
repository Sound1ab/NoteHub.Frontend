export const debounce = <F extends (...args: unknown[]) => void>(
  func: F,
  waitFor: number
) => {
  let timeout = 0

  const debounced = (...args: unknown[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), waitFor)
  }

  return (debounced as unknown) as (...args: Parameters<F>) => ReturnType<F>
}
