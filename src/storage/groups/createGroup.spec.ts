import { localStorage } from '@/libs/mmkv'
import { GROUP_COLLECTION } from '../config'
import { createGroup } from './createGroup'

describe('create Group Function', () => {
  beforeEach(() => {
    localStorage.clearAll()
  })
  it('should create a Group and save in the localStorage', () => {
    expect(localStorage.getString(GROUP_COLLECTION)).toBeUndefined()
    const groupName = 'Fake Group'

    const createdGroup = createGroup(groupName)

    expect(createdGroup).toBe(groupName)
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
    const savedGroupsMock = ['t13']
    localStorage.set(GROUP_COLLECTION, JSON.stringify(savedGroupsMock))

    expect(() => createGroup(savedGroupsMock[0])).toThrow()
  })
})
