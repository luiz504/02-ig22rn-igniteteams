import { render, screen } from '@testing-library/react-native'

import { ThemeProvider } from '@/providers/ThemeProvider'

import { Highlight } from '.'

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
