import { localStorage } from '@/libs/mmkv'
import { getAllTeams } from './getallTeams'
import { TEAM_COLLECTION } from '../config'

describe('getAllTeams function', () => {
  beforeEach(() => {
    localStorage.clearAll()
  })
  it('should return all teams saved on the LocalStorage (populated)', () => {
    const savedTeamsMock = ['Team 1', 'Team 2', 'Team 3']
    localStorage.set(TEAM_COLLECTION, JSON.stringify(savedTeamsMock))

    const teams = getAllTeams()

    expect(teams).toEqual(savedTeamsMock)
  })

  it('should return empty array when there are no teams saved on the LocalStorage (empty)', () => {
    const teams = getAllTeams()

    expect(teams).toEqual([])
  })

  it('should throw an error when the saved Data does not have the correct interface', () => {
    const savedTeamsMock = ['123123', { id: 't2', name: 't2', players: [] }]
    localStorage.set(TEAM_COLLECTION, JSON.stringify(savedTeamsMock))
    const teams = getAllTeams()
    expect(teams).toEqual([])
  })
})
