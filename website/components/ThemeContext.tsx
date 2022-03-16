import { createContext, Dispatch, SetStateAction, useContext } from 'react'

export const ThemeContext = createContext<
  [string, Dispatch<SetStateAction<string>>]
>(['light', () => {}])

export const useTheme = () => useContext(ThemeContext)
