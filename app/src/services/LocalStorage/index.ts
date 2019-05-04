export class LocalStorage {
  static setItem(key: string, item: any) {
    if (typeof item !== 'string' && typeof item !== 'number') {
      item = JSON.stringify(item)
    }

    localStorage.setItem(key, item)
  }

  static getItem(key: string) {
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

  static removeItem(key: string) {
    localStorage.removeItem(key)
  }
}
