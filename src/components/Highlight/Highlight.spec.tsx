import { render, screen } from '@testing-library/react-native'
import { Highlight } from '.'
import { ThemeProvider } from '@/providers/ThemeProvider'

describe('Highlight Component', () => {
  it('should render correctly', () => {
    const title = 'fake Title'
    const subTitle = 'fake SubTitle'
    render(<Highlight title={title} subtitle={subTitle} />, {
      wrapper: ThemeProvider,
    })

    expect(screen.getByText(title)).toBeVisible()
    expect(screen.getByText(subTitle)).toBeVisible()
  })
})
