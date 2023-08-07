import { z } from 'zod'

import { getAllGroups } from './getallGroups'
import { AppError } from '@/utils/AppError'

import { setGroupsStored } from '../utils/groupsHelpers'
import { deletePlayersStored } from '../utils/playersHelpers'

const groupNameSchema = z
  .string()
  .nonempty({ message: 'groupName is required' })
export function deleteGroupByName(groupName: string) {
  groupNameSchema.parse(groupName)

  const storedGroups = getAllGroups()

  const filteredGroups = storedGroups.filter((g) => g !== groupName)

  if (storedGroups.length === filteredGroups.length) {
    throw new AppError('Informed Group does not exist')
  }

  setGroupsStored(filteredGroups)
  deletePlayersStored(groupName)
}
