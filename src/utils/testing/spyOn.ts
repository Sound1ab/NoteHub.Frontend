let spy: any

export function spyOn<T extends Record<string, unknown>, M extends keyof T>(
  object: T,
  method: M,
  implementation: (...args: any[]) => any
) {
  spy = jest.spyOn(object, method as any).mockImplementation(implementation)
}

afterEach(() => {
  if (spy) {
    spy.mockRestore()
  }
})
