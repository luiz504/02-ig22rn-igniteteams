import { useRoute } from '@react-navigation/native'
import { fireEvent, screen, waitFor } from '@testing-library/react-native'

import { setPlayersStored } from '@/storage/utils/playersHelpers'
import * as GetPlayersByGroupAndTeamModule from '@/storage/players/getPlayersByGroupAndTeam'
import * as AddPlayerModule from '@/storage/players/addPlayerByGroup'

import { renderWithThemeAndNavigation } from '@/utils/test-utils'

import { localStorage } from '@/libs/mmkv'

import { PLayersScreenCommons } from './common'
import { TEAMS } from '../constants'

import { Players } from '..'
import { Alert } from 'react-native'

const {
  groupData,
  storedPlayers,
  inputID,
  submitBtnID,
  playerCardID,
  playersCounterID,
} = PLayersScreenCommons

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useRoute: jest.fn(),
  }
})
describe('Add Player Action integration', () => {
  const useMockedUseRoute = () =>
    jest
      .mocked(useRoute)
      .mockReturnValue({ params: { group: groupData } } as any)

  const useAlertSpy = () => jest.spyOn(Alert, 'alert')

  beforeEach(() => {
    jest.clearAllMocks()

    useMockedUseRoute()
    localStorage.clearAll()
  })
  it('should add a player to a team correctly and the list should be updated', async () => {
    setPlayersStored(groupData.name, storedPlayers)
    const initialStoredPlayerTeam0Count = storedPlayers.filter(
      (p) => p.team === TEAMS[0].name,
    ).length
    const getPlayerByGroupAndTeamSpy = jest.spyOn(
      GetPlayersByGroupAndTeamModule,
      'getPlayerByGroupAndTeam',
    )

    renderWithThemeAndNavigation(<Players />)

    const inputElement = screen.getByTestId(inputID)
    const submitBtnElement = screen.getByTestId(submitBtnID)
    const counterElement = screen.getByTestId(playersCounterID)

    // Check first render time
    expect(counterElement).toHaveTextContent(
      String(initialStoredPlayerTeam0Count),
    )
    expect(screen.getAllByTestId(playerCardID)).toHaveLength(
      initialStoredPlayerTeam0Count,
    )

    getPlayerByGroupAndTeamSpy.mockClear()

    // Act
    const newPlayerName = 'Player 1'
    fireEvent.changeText(inputElement, newPlayerName)
    fireEvent.press(submitBtnElement)

    // Assert
    await waitFor(() => {
      expect(screen.getByText(newPlayerName)).toBeOnTheScreen()
    })
    expect(getPlayerByGroupAndTeamSpy).toHaveBeenCalledTimes(1)

    expect(screen.getAllByTestId(playerCardID)).toHaveLength(
      initialStoredPlayerTeam0Count + 1,
    )
    expect(counterElement).toHaveTextContent(
      String(initialStoredPlayerTeam0Count + 1),
    )

    expect(inputElement).toHaveTextContent('')
  })
  it('should throw an Alert when the player name is not valid', () => {
    renderWithThemeAndNavigation(<Players />)
    const alertSpy = useAlertSpy()
    const inputElement = screen.getByTestId(inputID)
    const submitBtnElement = screen.getByTestId(submitBtnID)
    // Act
    fireEvent.changeText(inputElement, 'KO')
    fireEvent.press(submitBtnElement)
    // Assert
    expect(alertSpy).toBeCalledTimes(1)
    expect(alertSpy).toBeCalledWith(expect.any(String), expect.any(String))
  })
  it('should throw an Alert when the player name is already in a team', () => {
    jest
      .spyOn(AddPlayerModule, 'addPlayerByGroup')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    jest
      .spyOn(localStorage, 'getString')
      .mockReturnValue(JSON.stringify([{ name: 'KO', team: groupData.name }]))
    const alertSpy = useAlertSpy()

    renderWithThemeAndNavigation(<Players />)

    const inputElement = screen.getByTestId(inputID)
    const submitBtnElement = screen.getByTestId(submitBtnID)

    // Act
    fireEvent.changeText(inputElement, 'KO')
    fireEvent.press(submitBtnElement)
    // Assert
    expect(alertSpy).toBeCalledTimes(1)
    expect(alertSpy).toBeCalledWith(expect.any(String), expect.any(String))
  })
})
