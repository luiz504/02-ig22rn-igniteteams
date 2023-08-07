import { localStorage } from '@/libs/mmkv'

import { PlayerStorageDTO } from '../models/PlayerStorageDTO'
import { getPlayerByGroupAndTeam } from './getPlayersByGroupAndTeam'

describe('getPlayerByGroupAndTeam', () => {
  const mockPlayerGroup: PlayerStorageDTO[] = [
    { name: 'John Doe', team: 'Team1' },
    { name: 'Mary Doe', team: 'Team1' },
    { name: 'Joanna Doe', team: 'Team3' },
  ]
  it('should return the players from a group filtered by the team', () => {
    jest
      .spyOn(localStorage, 'getString')
      .mockReturnValue(JSON.stringify(mockPlayerGroup))

    //* Get with Team populated
    expect(getPlayerByGroupAndTeam('Group1', 'Team1')).toEqual([
      mockPlayerGroup[0],
      mockPlayerGroup[1],
    ])

    expect(getPlayerByGroupAndTeam('Group1', 'Team3')).toEqual([
      mockPlayerGroup[2],
    ])

    //* Get with Team that doesn't exist
    expect(getPlayerByGroupAndTeam('Group1', 'Team2')).toEqual([])
  })

  it('should trigger error when params validation fail', () => {
    expect(() => getPlayerByGroupAndTeam('', '')).toThrow()
    expect(() => getPlayerByGroupAndTeam([] as any, [] as any)).toThrow()
    expect(() => getPlayerByGroupAndTeam(null as any, null as any)).toThrow()
  })
})
