import { localStorage } from '@/libs/mmkv'
import { GROUP_COLLECTION } from '../config'
import { createGroup } from './createGroup'

import { setGroupsStored } from '../utils/groupsHelpers'

describe('create Group Function', () => {
  const initialGroups = ['Group  1', 'Group 2']
  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clearAll()
  })

  const useLocalStorageSetSpy = () => jest.spyOn(localStorage, 'set')

  it('should create a Group and save in the localStorage', () => {
    setGroupsStored(initialGroups)

    const localStorageSetSpy = useLocalStorageSetSpy()

    const groupName = 'Fake Group'

    createGroup(groupName)

    expect(localStorageSetSpy).toBeCalledTimes(1)
    expect(localStorageSetSpy).toBeCalledWith(
      GROUP_COLLECTION,
      JSON.stringify([...initialGroups, groupName]),
    )
  })
  it('should throw an error when passing wrong name format', () => {
    expect(() => createGroup('')).toThrow()
    expect(() => createGroup(null as any)).toThrow()
    expect(() => createGroup([] as any)).toThrow()
    expect(() => createGroup({} as any)).toThrow()
    expect(() =>
      createGroup(
        '1gh23ih1h23hui1h2ui3hui 1ui2h3uih1ui2h3iu1hui23hui1h2ui3hui1h23uih',
      ),
    ).toThrow()
  })

  it('should throw an error when trying to create a group with a name already in use', () => {
    setGroupsStored(initialGroups)

    expect(() => createGroup(initialGroups[0])).toThrow()
  })
})
