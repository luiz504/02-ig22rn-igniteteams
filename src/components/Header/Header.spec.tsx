import { fireEvent, screen } from '@testing-library/react-native'
import { useNavigation } from '@react-navigation/native'

import { renderWithThemeAndNavigation } from '@/utils/test-utils'

import { Header } from '.'

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
  }
})
describe('Header Component', () => {
  const btnNavigationID = 'btn-navigation'

  beforeEach(() => {
    jest.resetAllMocks()
  })

  const useNavigateMock = () => {
    const navigateMock = jest.fn()
    jest.mocked(useNavigation).mockReturnValue({ navigate: navigateMock })
    return navigateMock
  }
  it('should render correctly with showBackButton false', () => {
    renderWithThemeAndNavigation(<Header showBackButton={false} />)

    const logoElement = screen.getByTestId('logo')

    expect(screen.queryByTestId(btnNavigationID)).toBeNull()
    expect(logoElement).toBeVisible()
    expect(logoElement).toHaveStyle({ width: 46, height: 55 })
  })

  it('should render with showBackButton true', () => {
    renderWithThemeAndNavigation(<Header showBackButton={true} />)

    const logoElement = screen.getByTestId('logo')
    const btnNavigationElement = screen.getByTestId(btnNavigationID)
    expect(logoElement).toBeVisible()
    expect(btnNavigationElement).toBeVisible()
  })

  it('should call navigate function with correct route', () => {
    const navigateMock = useNavigateMock()
    renderWithThemeAndNavigation(<Header showBackButton={true} />)

    const btnNavigationElement = screen.getByTestId(btnNavigationID)

    // Act

    fireEvent.press(btnNavigationElement)

    expect(navigateMock).toBeCalledTimes(1)
    expect(navigateMock).toBeCalledWith('groups')
  })
})
