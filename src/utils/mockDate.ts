const RealDate = Date

export function mockDate(nowMock: string) {
  const MOCK_DATE = new Date(nowMock)

  global.Date = class extends Date {
    /* eslint-disable */
    constructor(date: any) {
      if (date) {
        super(date)
        return new RealDate(date)
      }
      return MOCK_DATE
    }
  } as any
}
