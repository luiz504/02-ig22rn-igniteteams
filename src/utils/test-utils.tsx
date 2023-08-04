import { ThemeProvider } from '@/providers/ThemeProvider'
import { NavigationContainer } from '@react-navigation/native'
import { render } from '@testing-library/react-native'
import { FC, ReactNode } from 'react'

export const renderWithTheme: typeof render = (ui, options) => {
  return render(ui, { wrapper: ThemeProvider, ...options })
}

const WrapperThemeAndNavigation: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <ThemeProvider>
      <NavigationContainer>{children}</NavigationContainer>
    </ThemeProvider>
  )
}

export const renderWithThemeAndNavigation: typeof render = (ui, options) => {
  return render(ui, { wrapper: WrapperThemeAndNavigation, ...options })
}
