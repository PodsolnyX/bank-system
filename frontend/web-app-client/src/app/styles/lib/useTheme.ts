import { useState } from "react"

export enum Themes {
    Default = "default",
    Dark = "dark"
}

export const dataAttributeName = 'theme'

export const useTheme = () => {
    const [theme, setTheme] = useState<Themes>(Themes.Default);
    document.body.dataset[dataAttributeName] = theme;

    return {theme, setTheme};
}