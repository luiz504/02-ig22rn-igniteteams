import { render } from '@testing-library/react-native'
import { Team } from '.'
import { ThemeProvider } from '@/providers/ThemeProvider'

describe('Team Screen', () => {
  it('should render correctly ', () => {
    render(<Team />, { wrapper: ThemeProvider })
  })
})
