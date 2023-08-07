import { renderWithThemeAndNavigation } from '@/utils/test-utils'
import { Players } from '..'
import { fireEvent, screen } from '@testing-library/react-native'
import { PLayersScreenCommons } from './common'
import { useRoute } from '@react-navigation/native'
import { TEAMS } from '../constants'
import { setPlayersStored } from '@/storage/utils/playersHelpers'
import { localStorage } from '@/libs/mmkv'
import { theme } from '@/styles'

const {
  groupData,
  storedPlayers,
  inputID,
  submitBtnID,
  teamSelectorID,
  playerCardID,
  playersCounterID,
  emptyFeedbackID,
  btnDeleteGroupID,
} = PLayersScreenCommons

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useRoute: jest.fn(),
  }
})
describe('Players Screen', () => {
  const useMockedUseRoute = () =>
    jest
      .mocked(useRoute)
      .mockReturnValue({ params: { group: groupData } } as any)

  beforeEach(() => {
    jest.clearAllMocks()

    useMockedUseRoute()
    localStorage.clearAll()
  })
  it('should render correctly with empty players', () => {
    setPlayersStored(groupData.name, [])

    renderWithThemeAndNavigation(<Players />)

    // Form
    expect(screen.getByTestId(inputID)).toBeOnTheScreen()
    expect(screen.getByTestId(submitBtnID)).toBeOnTheScreen()

    // Selectors / Counter
    expect(screen.getAllByTestId(teamSelectorID)).toHaveLength(2)
    expect(screen.queryByTestId(playersCounterID)).toBeNull()

    // Players / Feedbacks
    expect(screen.getByTestId(emptyFeedbackID)).toBeTruthy()
    expect(screen.queryByTestId(playerCardID)).toBeNull()

    // Delete
    expect(screen.getByTestId(btnDeleteGroupID)).toBeOnTheScreen()
  })

  it('should render correctly with many players', () => {
    setPlayersStored(groupData.name, storedPlayers)

    renderWithThemeAndNavigation(<Players />)

    // Form
    expect(screen.getByTestId(inputID)).toBeOnTheScreen()
    expect(screen.getByTestId(submitBtnID)).toBeOnTheScreen()

    // Selectors / Counter
    expect(screen.getAllByTestId(teamSelectorID)).toHaveLength(2)

    const defaultTeamPlayersCount = storedPlayers.filter(
      (p) => p.team === TEAMS[0].name,
    ).length

    expect(screen.getByTestId(playersCounterID)).toHaveTextContent(
      String(defaultTeamPlayersCount),
    )

    // Players / Feedbacks
    expect(screen.queryByTestId(emptyFeedbackID)).toBeNull()
    expect(screen.getAllByTestId(playerCardID)).toHaveLength(
      defaultTeamPlayersCount,
    )

    // Delete
    expect(screen.getByTestId(btnDeleteGroupID)).toBeOnTheScreen()
  })

  it('should be able to select between 2 teams and render correctly its members list', async () => {
    setPlayersStored(groupData.name, storedPlayers)
    const team0PlayersCount = storedPlayers.filter(
      (p) => p.team === TEAMS[0].name,
    ).length
    const team1PlayersCount = storedPlayers.filter(
      (p) => p.team === TEAMS[1].name,
    ).length

    renderWithThemeAndNavigation(<Players />)

    const teamSelectors = screen.getAllByTestId(teamSelectorID)
    const playersCounter = screen.getByTestId(playersCounterID)
    // Assert initial Render
    const assertTeam0 = () => {
      expect(teamSelectors[0]).toHaveStyle({
        borderTopColor: theme.colors['green-700'],
      })
      expect(playersCounter).toHaveTextContent(String(team0PlayersCount))
      expect(screen.getAllByTestId(playerCardID)).toHaveLength(
        team0PlayersCount,
      )
    }

    assertTeam0()

    // Act - Select Team 1
    fireEvent.press(teamSelectors[1])

    // Asset
    expect(playersCounter).toHaveTextContent(String(team1PlayersCount))
    expect(teamSelectors[1]).toHaveStyle({
      borderTopColor: theme.colors['green-700'],
    })
    expect(screen.getAllByTestId(playerCardID)).toHaveLength(team1PlayersCount)

    // Act - Select Team 0
    fireEvent.press(teamSelectors[0])
    assertTeam0()
  })
})
