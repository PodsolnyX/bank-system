import { useAuth } from 'oidc-react'
import { useGetThemeQuery, useUpdateThemeMutation } from 'shared/api/preferences'
import { Theme } from 'shared/entities'

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
