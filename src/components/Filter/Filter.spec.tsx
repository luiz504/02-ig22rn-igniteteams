import { render, screen } from '@testing-library/react-native'

import { ThemeProvider } from '@/providers/ThemeProvider'
import { theme } from '@/styles'

import { Filter } from '.'

describe('Filter Component', () => {
  const label = 'fake-label'
  const rootId = 'filter-root'
  it('should render correctly isActive false', () => {
    render(<Filter label={label} testID={rootId} />, { wrapper: ThemeProvider })

    const containerElement = screen.getByTestId(rootId)

    expect(containerElement).toBeTruthy()
    expect(containerElement).toHaveStyle({
      borderTopColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: 'transparent',
      borderLeftColor: 'transparent',
    })
    expect(screen.getByText(label)).toBeTruthy()
  })

  it('should render correctly isActive true', () => {
    render(<Filter label={label} isActive testID={rootId} />, {
      wrapper: ThemeProvider,
    })

    const containerElement = screen.getByTestId(rootId)

    expect(containerElement).toBeTruthy()
    expect(containerElement).toHaveStyle({
      borderTopColor: theme.colors['green-700'],
      borderRightColor: theme.colors['green-700'],
      borderBottomColor: theme.colors['green-700'],
      borderLeftColor: theme.colors['green-700'],
    })
    expect(screen.getByText(label)).toBeTruthy()
  })
})
