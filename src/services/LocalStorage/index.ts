export class LocalStorage {
  public static setItem(key: string, item: any) {
    if (typeof item !== 'string' && typeof item !== 'number') {
      item = JSON.stringify(item)
    }

    localStorage.setItem(key, item)
  }

  public static getItem(key: string) {
    const item = localStorage.getItem(key)
    if (!item) {
      return
    }

    try {
      return JSON.parse(`${item}`)
    } catch (e) {
      return item
    }
  }

  public static removeItem(key: string) {
    localStorage.removeItem(key)
  }
}
