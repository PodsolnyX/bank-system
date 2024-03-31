export const DataTransformer = (data: Record<any, any>) => {
  return Object.fromEntries(
    Object.entries(data).map(([k, v]) => [k.charAt(0).toLowerCase() + k.slice(1), v])
  )
}
