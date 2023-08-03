import { ThemeProvider } from '@/providers/ThemeProvider'
import { render } from '@testing-library/react-native'

export const renderWithTheme: typeof render = (ui, options) => {
  return render(ui, { wrapper: ThemeProvider, ...options })
}
