import { localStorage } from '@/libs/mmkv'
import { addPlayerByTeam } from './addPlayersByTeam'
import { PLAYER_COLLECTION } from '../config'

describe('addPlayersByTeam function', () => {
  const player = {
    name: 'John Doe',
    team: 'StarField',
  }
  const initialPlayers = [{ name: 'Mary Doe', team: 'StarField' }]

  it('should add a player correctly', () => {
    jest
      .spyOn(localStorage, 'getString')
      .mockReturnValueOnce(JSON.stringify(initialPlayers))
    const localStorageSetSpy = jest.spyOn(localStorage, 'set')
    expect(() => addPlayerByTeam(player, player.team)).not.toThrow()

    expect(localStorageSetSpy).toBeCalledTimes(1)
    expect(localStorageSetSpy).toBeCalledWith(
      `${PLAYER_COLLECTION}-${player.team}`,
      JSON.stringify([...initialPlayers, player]),
    )
  })

  it('should throw an error when passing params with wrong format', () => {
    expect(() =>
      addPlayerByTeam({ name: [], team: '12312' } as any, ''),
    ).toThrow()
    expect(() => addPlayerByTeam({ name: null, team: {} } as any, '')).toThrow()
    expect(() => addPlayerByTeam({ name: '', team: [] } as any, '')).toThrow()
    expect(() =>
      addPlayerByTeam({ name: '123123', team: '' } as any, ''),
    ).toThrow()
  })

  it('should thrown an error if the player already in a team', () => {
    jest
      .spyOn(localStorage, 'getString')
      .mockReturnValueOnce(JSON.stringify(initialPlayers))

    expect(() =>
      addPlayerByTeam(initialPlayers[0], initialPlayers[0].team),
    ).toThrow()
  })
})
