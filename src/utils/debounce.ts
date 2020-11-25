export const debounce = <F extends (...args: never[]) => Promise<void>>(
  func: F,
  waitFor: number
) => {
  let timeout = 0

  const debounced = (...args: never[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(async () => await func(...args), waitFor)
  }

  return (debounced as unknown) as (...args: Parameters<F>) => ReturnType<F>
}
