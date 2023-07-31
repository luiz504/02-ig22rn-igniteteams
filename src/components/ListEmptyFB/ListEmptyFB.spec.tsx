import { render, screen } from '@testing-library/react-native'
import { ListEmptyFB } from '.'
import { ThemeProvider } from '@/providers/ThemeProvider'

describe('ListEmptyFB Component', () => {
  it('should ', () => {
    const message = 'hello world'

    render(<ListEmptyFB message={message} />, { wrapper: ThemeProvider })

    expect(screen.getByText(message)).toBeVisible()
  })
})
