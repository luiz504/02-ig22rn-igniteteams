import { render, screen } from '@testing-library/react-native'
import { Groups } from '.'

describe('Should render Groups Screen', () => {
  it('should render correctly', () => {
    render(<Groups />)

    expect(screen.getByTestId('wrapper')).toBeTruthy()
  })
})
