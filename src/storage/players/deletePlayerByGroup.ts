import { localStorage } from '@/libs/mmkv'
import { getPlayersByGroup } from './getPlayersByGroup'
import { PLAYER_COLLECTION } from '../config'
import { AppError } from '@/utils/AppError'
import { z } from 'zod'

const playerNameSchema = z
  .string()
  .nonempty({ message: 'Player name is required' })
const groupNameSchema = z
  .string()
  .nonempty({ message: 'Group name is required' })
export function deletePlayerByGroup(playerName: string, groupName: string) {
  playerNameSchema.parse(playerName)
  groupNameSchema.parse(groupName)

  const storedGroup = getPlayersByGroup(groupName)

  if (!storedGroup.length) {
    throw new AppError('Unable to delete player from a empty group')
  }

  const updatedGroup = storedGroup.filter((p) => p.name !== playerName)

  if (updatedGroup.length >= storedGroup.length) {
    throw new AppError('This player does not exist in the group')
  }

  const updatedGroupStringified = JSON.stringify(updatedGroup)

  localStorage.set(`${PLAYER_COLLECTION}-${groupName}`, updatedGroupStringified)
}
