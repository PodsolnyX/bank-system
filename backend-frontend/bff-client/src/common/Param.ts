export class ParamsExtractor {
  static Get(url: string | null | undefined, key: string | null | undefined) {
    if (!url || !key) {
      return false
    }
    const parts = url.split('?')
    const vars = parts[parts.length - 1].split('&')
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=')
      if (pair[0] == key) {
        return pair[1]
      }
    }
    return false
  }
}
