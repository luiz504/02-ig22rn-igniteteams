import { z } from 'zod'

import { localStorage } from '@/libs/mmkv'
import { PLAYER_COLLECTION } from '../config'

import { PlayerStorageDTO } from '../models/PlayerStorageDTO'

const groupNameSchema = z
  .string()
  .nonempty({ message: 'groupName is required' })

const playersDataSchema = z.array(
  z.object({
    name: z
      .string()
      .min(3, { message: 'The player name must have at least 3 characters' }),
    team: z.string().nonempty({ message: 'The team name is required' }),
  }),
)
export function setPlayersStored(groupName: string, data: PlayerStorageDTO[]) {
  groupNameSchema.parse(groupName)

  playersDataSchema.parse(data)

  localStorage.set(`${PLAYER_COLLECTION}-${groupName}`, JSON.stringify(data))
}

export function getPlayersStored(groupName: string) {
  groupNameSchema.parse(groupName)

  return localStorage.getString(`${PLAYER_COLLECTION}-${groupName}`)
}

export function deletePlayersStored(groupName: string) {
  groupNameSchema.parse(groupName)

  localStorage.delete(`${PLAYER_COLLECTION}-${groupName}`)
}
