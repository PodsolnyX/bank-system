import { useAuth } from 'oidc-react'
import { useUpdateThemeMutation } from '../api'
import { Theme, useGetThemeQuery } from 'entities/preferences'

export const dataAttributeName = 'theme'

export const useTheme = () => {
  const isAuth = !!useAuth().userData
  const {
    isLoading,
    isError,
    data: preferences,
  } = useGetThemeQuery(undefined, {
    skip: !isAuth,
  })
  const [setTheme, themeUpdateResult] = useUpdateThemeMutation()

  const theme = isAuth
    ? themeUpdateResult.data?.theme || preferences?.theme
    : Theme.Default

  if (theme) {
    document.body.dataset[dataAttributeName] = theme
  }

  return {
    isLoading,
    isError,
    theme,
    setTheme,
  }
}
