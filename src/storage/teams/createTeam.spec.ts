import { localStorage } from '@/libs/mmkv'
import { TEAM_COLLECTION } from '../config'
import { createTeam } from './createTeam'
import { Team } from '@/models/Team'

describe('create Team Function', () => {
  beforeEach(() => {
    localStorage.clearAll()
  })
  it('should create a Team and save in the localStorage', () => {
    expect(localStorage.getString(TEAM_COLLECTION)).toBeUndefined()
    const teamName = 'Fake Team'

    const createdTeam = createTeam(teamName)

    expect(createdTeam).toEqual(
      expect.objectContaining({ name: teamName, players: [] }),
    )
  })
  it('should throw an error when trying to create a team with string < 3', () => {
    expect(() => createTeam('12')).toThrow()
    expect(() => createTeam('')).toThrow()
    expect(() => createTeam(null as any)).toThrow()
    expect(() => createTeam([] as any)).toThrow()
    expect(() => createTeam({} as any)).toThrow()
  })

  it('should throw an error when trying to create a team with a name already in use', () => {
    const savedTeamsMock: Team[] = [{ id: 't1', name: 't13', players: [] }]
    localStorage.set(TEAM_COLLECTION, JSON.stringify(savedTeamsMock))

    expect(() => createTeam(savedTeamsMock[0].name)).toThrow()
  })
})
