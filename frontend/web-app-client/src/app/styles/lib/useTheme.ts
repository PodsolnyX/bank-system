import { useGetThemeQuery, useUpdateThemeMutation } from 'shared/api/preferences'

export const dataAttributeName = 'theme'

export const useTheme = () => {
  const { isLoading, isError, data: preferences } = useGetThemeQuery()
  const [setTheme, themeUpdateResult] = useUpdateThemeMutation()

  const theme = themeUpdateResult.data?.theme || preferences?.theme

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
