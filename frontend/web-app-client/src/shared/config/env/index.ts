export const getEnvVar = (key: string) => {
  return import.meta.env[key]
}

export const IS_DEV_ENV = getEnvVar('DEV')
export const IS_PROD_ENV = getEnvVar('PROD')
