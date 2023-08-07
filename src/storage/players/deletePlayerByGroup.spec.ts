import { localStorage } from '@/libs/mmkv'
import { deletePlayerByGroup } from './deletePlayerByGroup'

import { PLAYER_COLLECTION } from '../config'
import { PlayerStorageDTO } from '../models/PlayerStorageDTO'

describe('deletePlayerByGroup Method', () => {
  const initialGroup: PlayerStorageDTO[] = [
    { name: 'Player 1', team: 'Fake Team' },
    { name: 'Player 2', team: 'Fake Team' },
  ]

  const groupName = 'Fake Group'
  const useLocalStorageGetSpy = () =>
    jest
      .spyOn(localStorage, 'getString')
      .mockReturnValue(JSON.stringify(initialGroup))

  beforeEach(() => {
    jest.resetAllMocks()
  })
  it('should throw an error when the method is called with invalid arguments', () => {
    expect(() =>
      deletePlayerByGroup(undefined as any, undefined as any),
    ).toThrow()
    expect(() => deletePlayerByGroup('', '')).toThrow()
    expect(() => deletePlayerByGroup(null as any, null as any)).toThrow()
  })
  it('should throw an error when the informed "Group" is empty', () => {
    expect(() => deletePlayerByGroup('Player 1', 'Ghost Group')).toThrow()
  })
  it(`should throw an error when the informed "Player" wasn't found in the "Group"`, () => {
    useLocalStorageGetSpy()

    expect(() => deletePlayerByGroup('Player 3', groupName)).toThrow()
  })
  it('should delete a player from the group correctly', () => {
    useLocalStorageGetSpy()
    const localStorageSetSpy = jest.spyOn(localStorage, 'set')
    deletePlayerByGroup(initialGroup[0].name, groupName)

    expect(localStorageSetSpy).toBeCalledTimes(1)
    expect(localStorageSetSpy).toBeCalledWith(
      `${PLAYER_COLLECTION}-${groupName}`,
      JSON.stringify([initialGroup[1]]),
    )
  })
})
