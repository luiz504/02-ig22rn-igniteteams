import { render, screen } from '@testing-library/react-native'
import { Header } from '.'
import { ThemeProvider } from '@/providers/ThemeProvider'

describe('Header Component', () => {
  it('should render correctly', () => {
    render(<Header />, { wrapper: ThemeProvider })

    const logoElement = screen.getByTestId('logo')
    expect(logoElement).toBeVisible()
    expect(logoElement).toHaveStyle({ width: 46, height: 55 })
  })
})
