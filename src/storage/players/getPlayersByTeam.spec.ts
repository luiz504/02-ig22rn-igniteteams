import { localStorage } from '@/libs/mmkv'
import { PlayerStorageDTO } from './PlayerStorageDTO'
import { getPlayersByTeam } from './getPlayersByTeam'

describe('getPlayersByTeam function', () => {
  it('should return the correct team players', () => {
    //* Team found Case
    const teamWIthPlayers: PlayerStorageDTO[] = [
      { name: 'John doe', team: 't1' },
      { name: 'Mary doe', team: 't1' },
    ]
    const localHostSpy = jest
      .spyOn(localStorage, 'getString')
      .mockReturnValue(JSON.stringify(teamWIthPlayers))

    expect(getPlayersByTeam('t1')).toEqual(teamWIthPlayers)

    //* No team found Case
    localHostSpy.mockReset()

    expect(getPlayersByTeam('t1')).toEqual([])
  })
})
