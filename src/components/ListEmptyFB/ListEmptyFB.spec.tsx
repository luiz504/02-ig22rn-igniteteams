import { render, screen } from '@testing-library/react-native'
import { ThemeProvider } from '@/providers/ThemeProvider'

import { ListEmptyFB } from '.'

describe('ListEmptyFB Component', () => {
  it('should ', () => {
    const message = 'hello world'

    render(<ListEmptyFB message={message} />, { wrapper: ThemeProvider })

    expect(screen.getByText(message)).toBeVisible()
  })
})
