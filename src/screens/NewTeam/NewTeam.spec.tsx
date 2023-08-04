import { render } from '@testing-library/react-native'
import { NewTeam } from '.'
import { ThemeProvider } from '@/providers/ThemeProvider'

describe('NewTeam Component', () => {
  it('should render correctly', () => {
    render(<NewTeam />, { wrapper: ThemeProvider })
  })
})
