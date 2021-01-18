// eslint-disable-next-line
let spy: any

export function spyOn<T extends Record<string, unknown>, M extends keyof T>(
  object: T,
  method: M,
  // eslint-disable-next-line
  implementation: (...args: any[]) => any
) {
  // eslint-disable-next-line
  spy = jest.spyOn(object, method as any).mockImplementation(implementation)
}

afterEach(() => {
  if (spy) {
    spy.mockRestore()
  }
})
