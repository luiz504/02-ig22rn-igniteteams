import { z } from 'zod'

import { getPlayersByGroup } from './getPlayersByGroup'

import { AppError } from '@/utils/AppError'
import { setPlayersStored } from '../utils/playersHelpers'

const playerNameSchema = z
  .string()
  .nonempty({ message: 'playerName is required' })
export function deletePlayerByGroup(playerName: string, groupName: string) {
  playerNameSchema.parse(playerName)

  const storedGroup = getPlayersByGroup(groupName)

  if (!storedGroup.length) {
    throw new AppError('Unable to delete player from a empty group')
  }

  const updatedGroup = storedGroup.filter((p) => p.name !== playerName)

  if (updatedGroup.length >= storedGroup.length) {
    throw new AppError('This player does not exist in the group')
  }

  setPlayersStored(groupName, updatedGroup)
}
