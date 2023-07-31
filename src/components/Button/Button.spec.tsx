import { render, screen } from '@testing-library/react-native'
import { Button } from '.'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { theme } from '@/styles'

describe('Button Component', () => {
  const label = 'Button Label'
  const btnID = 'btn-id'
  it('should render correctly the primary variant', () => {
    render(<Button label={label} testID={btnID} />, { wrapper: ThemeProvider })

    const btnElement = screen.getByTestId(btnID)

    expect(btnElement).toBeVisible()
    expect(btnElement).toHaveStyle({
      backgroundColor: theme.colors['green-700'],
    })
    expect(screen.getByText(label)).toBeVisible()
  })

  it('should render correctly the secondary variant', () => {
    render(<Button label={label} testID={btnID} type="secondary" />, {
      wrapper: ThemeProvider,
    })
    const btnElement = screen.getByTestId(btnID)

    expect(btnElement).toHaveStyle({
      backgroundColor: theme.colors['red-700'],
    })
  })
})
