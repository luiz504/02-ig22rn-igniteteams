import { fireEvent, screen } from '@testing-library/react-native'
import { Teams } from '.'
import { renderWithThemeAndNavigation } from '@/utils/test-utils'
import { useNavigation } from '@react-navigation/native'

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
  }
})
describe('Should render Teams Screen', () => {
  const btnCreateTeamID = 'btn-create-team'

  beforeEach(() => {
    jest.resetAllMocks()
  })
  it('should render correctly', () => {
    renderWithThemeAndNavigation(<Teams />)

    expect(screen.getByTestId('wrapper-teams')).toBeOnTheScreen()
    expect(screen.getByTestId(btnCreateTeamID)).toBeOnTheScreen()
  })
  it('should navigate to NewGroup Route when press the New Group button', () => {
    const navigateMock = jest.fn()
    jest.mocked(useNavigation).mockReturnValue({ navigate: navigateMock })
    renderWithThemeAndNavigation(<Teams />)
    const btnCreateTeamElement = screen.getByTestId(btnCreateTeamID)

    // Act
    fireEvent.press(btnCreateTeamElement)

    // Results
    expect(navigateMock).toBeCalledTimes(1)
    expect(navigateMock).toBeCalledWith('new-team')
  })
})
