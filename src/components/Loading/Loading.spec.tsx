import { render, screen } from '@testing-library/react-native'
import { Loading } from '.'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { theme } from '@/styles'

describe('Loading Component', () => {
  it('should render the component correctly', () => {
    render(<Loading />, { wrapper: ThemeProvider })

    const containerElement = screen.getByTestId('container')
    const indicatorElement = screen.getByTestId('loading-indicator')

    expect(containerElement).toBeVisible()
    expect(containerElement).toHaveStyle({
      backgroundColor: theme.colors['gray-600'],
    })

    expect(indicatorElement).toBeVisible()
    expect(indicatorElement).toHaveProp('size', 40)
    expect(indicatorElement).toHaveProp('color', theme.colors['green-700'])
  })
})
