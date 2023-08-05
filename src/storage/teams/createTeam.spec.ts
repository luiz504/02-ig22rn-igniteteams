import { localStorage } from '@/libs/mmkv'
import { TEAM_COLLECTION } from '../config'
import { createTeam } from './createTeam'

describe('create Team Function', () => {
  beforeEach(() => {
    localStorage.clearAll()
  })
  it('should create a Team and save in the localStorage', () => {
    expect(localStorage.getString(TEAM_COLLECTION)).toBeUndefined()
    const teamName = 'Fake Team'

    const createdTeam = createTeam(teamName)

    expect(createdTeam).toBe(teamName)
  })
  it('should throw an error when passing wrong name format', () => {
    expect(() => createTeam('')).toThrow()
    expect(() => createTeam(null as any)).toThrow()
    expect(() => createTeam([] as any)).toThrow()
    expect(() => createTeam({} as any)).toThrow()
    expect(() =>
      createTeam(
        '1gh23ih1h23hui1h2ui3hui 1ui2h3uih1ui2h3iu1hui23hui1h2ui3hui1h23uih',
      ),
    ).toThrow()
  })

  it('should throw an error when trying to create a team with a name already in use', () => {
    const savedTeamsMock = ['t13']
    localStorage.set(TEAM_COLLECTION, JSON.stringify(savedTeamsMock))

    expect(() => createTeam(savedTeamsMock[0])).toThrow()
  })
})
