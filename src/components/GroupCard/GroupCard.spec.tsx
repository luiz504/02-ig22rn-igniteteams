import { render, screen } from '@testing-library/react-native'

import { GroupCard } from '.'
import { ThemeProvider } from '@/providers/ThemeProvider'

describe('GroupCard Component', () => {
  it('should render correctly', () => {
    const cardName = 'Fake Card Name'
    render(<GroupCard name={cardName} />, { wrapper: ThemeProvider })

    expect(screen.getByText(cardName))
    expect(screen.getByTestId('users-icon')).toBeVisible()
  })
})
