export const session = {
  set(key: string, val: any) {
    sessionStorage.setItem(key, JSON.stringify(val))
  },
  get(key: string) {
    return JSON.parse(sessionStorage.getItem(key) || 'null')
  },
  remove(key: string) {
    sessionStorage.removeItem(key)
  },
}
