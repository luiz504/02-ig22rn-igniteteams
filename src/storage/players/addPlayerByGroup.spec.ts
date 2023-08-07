import { localStorage } from '@/libs/mmkv'
import { addPlayerByGroup } from './addPlayerByGroup'
import { PLAYER_COLLECTION } from '../config'

describe('addPlayerByGroup function', () => {
  const player = {
    name: 'John Doe',
    team: 'StarField',
  }
  const groupName = 'Group Fake'
  const initialPlayers = [{ name: 'Mary Doe', team: 'StarField' }]

  it('should add a player correctly to a group', () => {
    jest
      .spyOn(localStorage, 'getString')
      .mockReturnValueOnce(JSON.stringify(initialPlayers))
    const localStorageSetSpy = jest.spyOn(localStorage, 'set')

    addPlayerByGroup(player, groupName)

    expect(localStorageSetSpy).toBeCalledTimes(1)
    expect(localStorageSetSpy).toBeCalledWith(
      `${PLAYER_COLLECTION}-${groupName}`,
      JSON.stringify([...initialPlayers, player]),
    )
  })

  it('should throw an error when passing params with wrong format', () => {
    expect(() =>
      addPlayerByGroup({ name: [], team: '12312' } as any, ''),
    ).toThrow()

    expect(() =>
      addPlayerByGroup({ name: null, team: {} } as any, ''),
    ).toThrow()

    expect(() => addPlayerByGroup({ name: '', team: [] } as any, '')).toThrow()

    expect(() =>
      addPlayerByGroup({ name: '123123', team: '' } as any, ''),
    ).toThrow()
  })

  it('should thrown an error if the player already in a Group', () => {
    jest
      .spyOn(localStorage, 'getString')
      .mockReturnValueOnce(JSON.stringify(initialPlayers))

    expect(() => addPlayerByGroup(initialPlayers[0], groupName)).toThrow()
  })
})
