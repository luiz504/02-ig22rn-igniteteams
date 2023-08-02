import { render, screen } from '@testing-library/react-native'
import { ButtonIcon } from '.'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { theme } from '@/styles'
import { MaterialIcons } from '@expo/vector-icons'
describe('ButtonIcon Component', () => {
  const btnRootId = 'btn-id'
  const iconName = '10k'
  it('should render correctly with variant `primary`', () => {
    render(
      <ButtonIcon variant="primary" iconName={iconName} testID={btnRootId} />,
      {
        wrapper: ThemeProvider,
      },
    )

    const iconElement = screen.UNSAFE_getByType(MaterialIcons)
    expect(iconElement).toHaveProp('color', theme.colors['green-700'])
    expect(iconElement).toHaveProp('name', iconName)
  })

  it('should render correctly with variant `secondary`', () => {
    render(
      <ButtonIcon variant="secondary" iconName={iconName} testID={btnRootId} />,
      {
        wrapper: ThemeProvider,
      },
    )

    const iconElement = screen.UNSAFE_getByType(MaterialIcons)
    expect(iconElement).toHaveProp('color', theme.colors['red-700'])
  })
})
