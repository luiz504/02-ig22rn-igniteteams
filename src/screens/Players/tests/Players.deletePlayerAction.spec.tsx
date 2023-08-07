import { useRoute } from '@react-navigation/native'
import { fireEvent, screen } from '@testing-library/react-native'

import { setPlayersStored } from '@/storage/utils/playersHelpers'
import * as GetPlayersByGroupAndTeamModule from '@/storage/players/getPlayersByGroupAndTeam'
import * as DeletePlayerModule from '@/storage/players/deletePlayerByGroup'

import { renderWithThemeAndNavigation } from '@/utils/test-utils'

import { localStorage } from '@/libs/mmkv'

import { PLayersScreenCommons } from './common'
import { TEAMS } from '../constants'

import { Players } from '..'
import { Alert } from 'react-native'

const { groupData, storedPlayers, playerCardID, playersCounterID } =
  PLayersScreenCommons

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useRoute: jest.fn(),
  }
})

describe('Players Screen => Delete Player Action integration', () => {
  const useMockedUseRoute = () =>
    jest
      .mocked(useRoute)
      .mockReturnValue({ params: { group: groupData } } as any)

  beforeEach(() => {
    jest.clearAllMocks()

    useMockedUseRoute()
    localStorage.clearAll()
  })

  it('should delete a player correctly', async () => {
    setPlayersStored(groupData.name, storedPlayers)
    const initialStoredPlayerTeam0Count = storedPlayers.filter(
      (p) => p.team === TEAMS[0].name,
    ).length

    renderWithThemeAndNavigation(<Players />)

    const deletePlayerByGroupSpy = jest.spyOn(
      DeletePlayerModule,
      'deletePlayerByGroup',
    )
    const getPlayerByGroupAndTeamSpy = jest.spyOn(
      GetPlayersByGroupAndTeamModule,
      'getPlayerByGroupAndTeam',
    )

    const counterElement = screen.getByTestId(playersCounterID)

    // Check first render time
    expect(counterElement).toHaveTextContent(
      String(initialStoredPlayerTeam0Count),
    )
    expect(screen.getAllByTestId(playerCardID)).toHaveLength(
      initialStoredPlayerTeam0Count,
    )

    const deletePlayersBtns = screen.getAllByTestId(
      `${playerCardID}-delete-btn`,
    )
    jest.clearAllMocks()

    // Act
    fireEvent.press(deletePlayersBtns[0])

    // Assert

    expect(deletePlayerByGroupSpy).toHaveBeenCalledTimes(1)
    expect(getPlayerByGroupAndTeamSpy).toHaveBeenCalledTimes(1)

    expect(screen.getAllByTestId(playerCardID)).toHaveLength(
      initialStoredPlayerTeam0Count - 1,
    )
    expect(counterElement).toHaveTextContent(
      String(initialStoredPlayerTeam0Count - 1),
    )
  })

  it('should trigger an Alert when the player delete action fails', () => {
    const alertSpy = jest.spyOn(Alert, 'alert')

    jest
      .spyOn(DeletePlayerModule, 'deletePlayerByGroup')
      .mockImplementationOnce(() => {
        throw new Error('any error')
      })
    setPlayersStored(groupData.name, storedPlayers)

    renderWithThemeAndNavigation(<Players />)

    const deletePlayersBtns = screen.getAllByTestId(
      `${playerCardID}-delete-btn`,
    )

    // Act
    fireEvent.press(deletePlayersBtns[0])

    expect(alertSpy).toBeCalledTimes(1)
    expect(alertSpy).toBeCalledWith(expect.any(String), expect.any(String))
  })

  it('should trigger an Alert when the player delete action fails', () => {
    const alertSpy = jest.spyOn(Alert, 'alert')

    setPlayersStored(groupData.name, storedPlayers)

    renderWithThemeAndNavigation(<Players />)

    jest
      .spyOn(GetPlayersByGroupAndTeamModule, 'getPlayerByGroupAndTeam')
      .mockImplementationOnce(() => {
        throw new Error('any error')
      })

    const deletePlayersBtns = screen.getAllByTestId(
      `${playerCardID}-delete-btn`,
    )

    // Act
    fireEvent.press(deletePlayersBtns[0])

    expect(alertSpy).toBeCalledTimes(1)
    expect(alertSpy).toBeCalledWith(expect.any(String), expect.any(String))
  })
})
