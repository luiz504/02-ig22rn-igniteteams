import { fireEvent, screen } from '@testing-library/react-native'
import { Teams } from '.'
import { renderWithThemeAndNavigation } from '@/utils/test-utils'
import { useNavigation } from '@react-navigation/native'
import { localStorage } from '@/libs/mmkv'

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
  }
})
describe('Should render Teams Screen', () => {
  const btnCreateTeamID = 'btn-create-team'
  const savedTeamsMock = ['t13', 't23']
  beforeEach(() => {
    jest.resetAllMocks()
  })

  const useMockNavigate = () => {
    const navigateMock = jest.fn()
    jest.mocked(useNavigation).mockReturnValue({ navigate: navigateMock })
    return navigateMock
  }

  it('should render correctly', () => {
    renderWithThemeAndNavigation(<Teams />)

    expect(screen.getByTestId('wrapper-teams')).toBeOnTheScreen()
    expect(screen.getByTestId(btnCreateTeamID)).toBeOnTheScreen()
  })
  it('should navigate to NewGroup Route when press the New Group button', () => {
    const navigateMock = useMockNavigate()
    renderWithThemeAndNavigation(<Teams />)

    const btnCreateTeamElement = screen.getByTestId(btnCreateTeamID)

    // Act
    fireEvent.press(btnCreateTeamElement)

    // Results
    expect(navigateMock).toBeCalledTimes(1)
    expect(navigateMock).toBeCalledWith('new-team')
  })

  it('should navigate to the correct Players screen page', () => {
    jest
      .spyOn(localStorage, 'getString')
      .mockReturnValue(JSON.stringify(savedTeamsMock))

    const navigateMock = useMockNavigate()
    renderWithThemeAndNavigation(<Teams />)

    const teamCardElement = screen.getByTestId(`team-card-${savedTeamsMock[1]}`)

    expect(teamCardElement).toBeOnTheScreen()

    // Acts
    fireEvent.press(teamCardElement)

    expect(navigateMock).toHaveBeenCalledTimes(1)
    expect(navigateMock).toHaveBeenCalledWith('players', {
      team: { name: savedTeamsMock[1] },
    })
  })
})
