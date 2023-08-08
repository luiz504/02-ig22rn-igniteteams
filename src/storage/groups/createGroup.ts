import { z } from 'zod'

import { getAllGroups } from './getallGroups'

import { AppError } from '@/utils/AppError'
import { setGroupsStored } from '../utils/groupsHelpers'

const groupNameSchema = z
  .string()
  .nonempty({ message: 'Group name is required' })
  .max(30, { message: 'Group Name must have a maximum of 20 characters' })
export function createGroup(groupName: string) {
  const trimmedValue = groupName.trim()

  groupNameSchema.parse(trimmedValue)

  const storedTeams = getAllGroups()

  const teamAlreadyExists = storedTeams.find(
    (t) => t.toLowerCase() === trimmedValue.toLowerCase(),
  )

  if (teamAlreadyExists) throw new AppError('Group name already in use.')

  const newGroups = [...storedTeams, groupName]

  setGroupsStored(newGroups)
}
