import { fireEvent, render, screen } from '@testing-library/react-native'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { theme } from '@/styles'

import { Input } from '.'
describe('Input Component', () => {
  const testID = 'input-id'
  it('should render correctly with placeholder and focused styles', async () => {
    const placeholderValue = 'fake-holder'
    render(<Input testID={testID} placeholder={placeholderValue} />, {
      wrapper: ThemeProvider,
    })

    const inputElement = screen.getByTestId(testID)
    expect(inputElement).toHaveProp('placeholder', placeholderValue)

    const defaultBorderStyle = {
      borderTopColor: theme.colors['gray-700'],
      borderBottomColor: theme.colors['gray-700'],
      borderLeftColor: theme.colors['gray-700'],
      borderRightColor: theme.colors['gray-700'],
    }
    expect(inputElement).toHaveStyle(defaultBorderStyle)

    fireEvent(inputElement, 'focus')

    expect(inputElement).toHaveStyle({
      borderTopColor: theme.colors['green-700'],
      borderBottomColor: theme.colors['green-700'],
      borderLeftColor: theme.colors['green-700'],
      borderRightColor: theme.colors['green-700'],
    })

    fireEvent(inputElement, 'blur')

    expect(inputElement).toHaveStyle(defaultBorderStyle)
  })

  it('should render correctly without placeholder and hasError true', () => {
    render(<Input testID={testID} hasError />, {
      wrapper: ThemeProvider,
    })

    const inputElement = screen.getByTestId(testID)
    expect(inputElement).not.toHaveProp('placeholder')

    const defaultBorderStyle = {
      borderTopColor: theme.colors['red-700'],
      borderBottomColor: theme.colors['red-700'],
      borderLeftColor: theme.colors['red-700'],
      borderRightColor: theme.colors['red-700'],
    }

    expect(inputElement).toHaveStyle(defaultBorderStyle)

    fireEvent(inputElement, 'focus')

    expect(inputElement).toHaveStyle({
      borderTopColor: theme.colors['green-700'],
      borderBottomColor: theme.colors['green-700'],
      borderLeftColor: theme.colors['green-700'],
      borderRightColor: theme.colors['green-700'],
    })

    fireEvent(inputElement, 'blur')

    expect(inputElement).toHaveStyle(defaultBorderStyle)
  })
})
