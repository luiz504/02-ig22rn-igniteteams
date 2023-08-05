import { z } from 'zod'

import { GROUP_COLLECTION } from '../config'
import { getAllGroups } from './getallGroups'

import { localStorage } from '@/libs/mmkv'
import { AppError } from '@/utils/AppError'
export function createGroup(groupName: string) {
  const nameSchema = z
    .string()
    .nonempty({ message: 'Group name is required' })
    .max(30, { message: 'Group Name must have a maximum of 20 characters' })

  const trimmedValue = groupName.trim()
  nameSchema.parse(trimmedValue)

  const storedTeams = getAllGroups()

  const teamAlreadyExists = storedTeams.find(
    (t) => t.toLowerCase() === trimmedValue.toLowerCase(),
  )

  if (teamAlreadyExists) throw new AppError('Team  name already in use.')

  const newGroups = [...storedTeams, groupName]
  localStorage.set(GROUP_COLLECTION, JSON.stringify(newGroups))

  return groupName
}
