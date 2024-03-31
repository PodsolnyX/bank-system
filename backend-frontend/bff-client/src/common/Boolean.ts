export type boolstr = 'true' | 'false'

export function parseBoolean(string: string | undefined | null) {
  return string === 'true' ? true : string === 'false' ? false : undefined
}
