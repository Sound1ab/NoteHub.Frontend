// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Procedure = (...args: any[]) => void

export type Options = {
  isImmediate: boolean
}

export interface IDebouncedFunction<F extends Procedure> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (this: ThisParameterType<F>, ...args: Parameters<F>): Promise<any>
  cancel: () => void
}

export function debounce<F extends Procedure>(
  func: F,
  waitMilliseconds = 50,
  options: Options = {
    isImmediate: false,
  }
): IDebouncedFunction<F> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined

  const debouncedFunction = function (
    this: ThisParameterType<F>,
    ...args: Parameters<F>
  ) {
    return new Promise((res) => {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const context = this

      const doLater = function () {
        timeoutId = undefined
        if (!options.isImmediate) {
          const result = func.apply(context, args)
          res(result)
        }
      }

      const shouldCallNow = options.isImmediate && timeoutId === undefined

      if (timeoutId !== undefined) {
        clearTimeout(timeoutId)
      }

      timeoutId = setTimeout(doLater, waitMilliseconds)

      if (shouldCallNow) {
        func.apply(context, args)
      }
    })
  }

  debouncedFunction.cancel = function () {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId)
    }
  }

  return debouncedFunction
}
