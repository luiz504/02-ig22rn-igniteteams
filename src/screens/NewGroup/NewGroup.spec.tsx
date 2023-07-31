import { render } from '@testing-library/react-native'
import { NewGroup } from '.'
import { ThemeProvider } from '@/providers/ThemeProvider'

describe('NewGroup Component', () => {
  it('should render correctly', () => {
    render(<NewGroup />, { wrapper: ThemeProvider })
  })
})
