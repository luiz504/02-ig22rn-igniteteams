import { localStorage } from '@/libs/mmkv'

import { GROUP_COLLECTION } from '../config'
import { getAllGroups } from './getallGroups'

describe('getAllGroups function', () => {
  beforeEach(() => {
    localStorage.clearAll()
  })
  it('should return all groups saved on the LocalStorage (populated)', () => {
    const savedGroupsMock = ['Team 1', 'Team 2', 'Team 3']
    localStorage.set(GROUP_COLLECTION, JSON.stringify(savedGroupsMock))

    const groups = getAllGroups()

    expect(groups).toEqual(savedGroupsMock)
  })

  it('should return empty array when there are no groups saved on the LocalStorage (empty)', () => {
    const groups = getAllGroups()

    expect(groups).toEqual([])
  })

  it('should throw an error when the saved Data does not have the correct interface', () => {
    const savedGroupsMock = ['123123', { id: 't2', name: 't2', players: [] }]
    localStorage.set(GROUP_COLLECTION, JSON.stringify(savedGroupsMock))
    const groups = getAllGroups()
    expect(groups).toEqual([])
  })
})
