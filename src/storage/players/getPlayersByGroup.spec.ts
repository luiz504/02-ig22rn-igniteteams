import { localStorage } from '@/libs/mmkv'

import { getPlayersByGroup } from './getPlayersByGroup'
import { PlayerStorageDTO } from '../models/PlayerStorageDTO'

describe('getPlayersByTeam function', () => {
  it('should return the correct players from a Group', () => {
    //* Team found Case
    const teamWIthPlayers: PlayerStorageDTO[] = [
      { name: 'John doe', team: 't1' },
      { name: 'Mary doe', team: 't1' },
    ]
    const localHostSpy = jest
      .spyOn(localStorage, 'getString')
      .mockReturnValue(JSON.stringify(teamWIthPlayers))

    expect(getPlayersByGroup('t1')).toEqual(teamWIthPlayers)

    //* No team found Case
    localHostSpy.mockReset()

    expect(getPlayersByGroup('t1')).toEqual([])
  })
})
