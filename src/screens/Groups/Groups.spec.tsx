import { render, screen } from '@testing-library/react-native'
import { Groups } from '.'
import { ThemeProvider } from '@/providers/ThemeProvider'

describe('Should render Groups Screen', () => {
  it('should render correctly', () => {
    render(<Groups />, { wrapper: ThemeProvider })

    expect(screen.getByTestId('wrapper')).toBeTruthy()
  })
})
