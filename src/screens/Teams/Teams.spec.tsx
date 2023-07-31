import { render, screen } from '@testing-library/react-native'
import { Teams } from '.'
import { ThemeProvider } from '@/providers/ThemeProvider'

describe('Should render Teams Screen', () => {
  it('should render correctly', () => {
    render(<Teams />, { wrapper: ThemeProvider })

    expect(screen.getByTestId('wrapper')).toBeTruthy()
  })
})
