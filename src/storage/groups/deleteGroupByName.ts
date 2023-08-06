import { z } from 'zod'
import { GROUP_COLLECTION, PLAYER_COLLECTION } from '../config'
import { getAllGroups } from './getallGroups'
import { AppError } from '@/utils/AppError'
import { localStorage } from '@/libs/mmkv'

const groupNameSchema = z
  .string()
  .nonempty({ message: 'Group name is required' })
export function deleteGroupByName(groupName: string) {
  groupNameSchema.parse(groupName)

  const storedGroups = getAllGroups()

  const filteredGroups = storedGroups.filter((g) => g !== groupName)

  if (storedGroups.length === filteredGroups.length) {
    throw new AppError('Informed Group does not exist')
  }

  localStorage.set(GROUP_COLLECTION, JSON.stringify(filteredGroups))
  localStorage.delete(`${PLAYER_COLLECTION}-${groupName}`)
}
