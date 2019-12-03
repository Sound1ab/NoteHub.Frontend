export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
) => {
  let timeout = 0

  const debounced = (...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), waitFor)
  }

  return (debounced as unknown) as (...args: Parameters<F>) => ReturnType<F>
}
