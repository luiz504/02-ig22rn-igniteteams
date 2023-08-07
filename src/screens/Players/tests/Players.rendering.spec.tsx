import { renderWithThemeAndNavigation } from '@/utils/test-utils'
import { Players } from '..'
import { screen } from '@testing-library/react-native'
import { PLayersScreenCommons } from './common'
import { useRoute } from '@react-navigation/native'
import { TEAMS } from '../constants'
import { setPlayersStored } from '@/storage/utils/playersHelpers'
import { localStorage } from '@/libs/mmkv'

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
    useMockedUseRoute()

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
})
