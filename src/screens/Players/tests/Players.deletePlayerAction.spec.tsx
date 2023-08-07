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

const { groupData, storedPlayers, playerCardID, playersCounterID } =
  PLayersScreenCommons

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useRoute: jest.fn(),
  }
})

describe('Delete Player Action integration', () => {
  const useMockedUseRoute = () =>
    jest
      .mocked(useRoute)
      .mockReturnValue({ params: { group: groupData } } as any)

  beforeEach(() => {
    jest.clearAllMocks()

    useMockedUseRoute()
    localStorage.clearAll()
  })

  it('should delete a player correctly', () => {
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
})
