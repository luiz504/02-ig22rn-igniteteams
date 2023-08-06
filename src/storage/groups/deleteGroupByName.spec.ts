import { localStorage } from '@/libs/mmkv'
import { deleteGroupByName } from './deleteGroupByName'
import { GROUP_COLLECTION, PLAYER_COLLECTION } from '../config'

describe('deleteGroupByName functions', () => {
  const useLocalStorageGetSpy = () => jest.spyOn(localStorage, 'getString')
  const useLocalStorageSetSpy = () => jest.spyOn(localStorage, 'set')
  const useLocalStorageDeleteSpy = () => jest.spyOn(localStorage, 'delete')

  const initialGroups = ['Group 1', 'Group 2']

  beforeEach(() => {
    jest.resetAllMocks()
  })
  it('should throw an error when arguments are not valid', () => {
    expect(() => deleteGroupByName(undefined as any)).toThrow()
    expect(() => deleteGroupByName('')).toThrow()
    expect(() => deleteGroupByName(null as any)).toThrow()
    expect(() => deleteGroupByName([] as any)).toThrow()
  })

  it(`should throw an error when the 'Group' does not exist`, () => {
    useLocalStorageGetSpy().mockReturnValue(JSON.stringify(initialGroups))

    expect(() => deleteGroupByName('Group 3')).toThrow()
  })

  it('should delete a group correctly', () => {
    useLocalStorageGetSpy().mockReturnValue(JSON.stringify(initialGroups))
    const localStorageSetSpy = useLocalStorageSetSpy()
    const localStorageDeleteSpy = useLocalStorageDeleteSpy()
    const groupName = initialGroups[1]

    deleteGroupByName(groupName)

    expect(localStorageSetSpy).toBeCalledTimes(1)
    expect(localStorageSetSpy).toHaveBeenCalledWith(
      GROUP_COLLECTION,
      JSON.stringify([initialGroups[0]]),
    )

    expect(localStorageDeleteSpy).toBeCalledTimes(1)
    expect(localStorageDeleteSpy).toHaveBeenCalledWith(
      `${PLAYER_COLLECTION}-${groupName}`,
    )
  })
})
