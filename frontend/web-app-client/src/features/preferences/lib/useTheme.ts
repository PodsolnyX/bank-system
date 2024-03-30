import { useAuth } from 'oidc-react'
import { Theme, useGetThemeQuery } from 'entities/preferences'
import { useUpdateThemeMutation } from '../api'

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
    : localStorage.getItem('theme') || Theme.Default

  if (theme) {
    document.body.dataset[dataAttributeName] = theme
    localStorage.setItem('theme', theme)
  }

  return {
    isLoading,
    isError,
    theme,
    setTheme,
  }
}
