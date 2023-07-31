import { render, screen } from '@testing-library/react-native'
import { Header } from '.'
import { ThemeProvider } from '@/providers/ThemeProvider'

describe('Header Component', () => {
  it('should render correctly with showBackButton false', () => {
    render(<Header showBackButton={false} />, { wrapper: ThemeProvider })

    const logoElement = screen.getByTestId('logo')

    expect(screen.queryByTestId('back-btn')).toBeNull()
    expect(logoElement).toBeVisible()
    expect(logoElement).toHaveStyle({ width: 46, height: 55 })
  })

  it('should render with showBackButton true', () => {
    render(<Header showBackButton={true} />, { wrapper: ThemeProvider })

    const logoElement = screen.getByTestId('logo')
    const backBtnElement = screen.getByTestId('back-btn')
    expect(logoElement).toBeVisible()
    expect(backBtnElement).toBeVisible()
  })
})
