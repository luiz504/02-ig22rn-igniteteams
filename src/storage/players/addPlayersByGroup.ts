import { z } from 'zod'

import { localStorage } from '@/libs/mmkv'
import { PlayerStorageDTO } from './PlayerStorageDTO'
import { PLAYER_COLLECTION } from '../config'
import { getPlayersByGroup } from './getPlayersByGroup'
import { AppError } from '@/utils/AppError'

const groupSchema = z
  .string()
  .nonempty({ message: 'The group name is required' })

const playerSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'The player name must have at least 3 characters' }),
  team: z.string().nonempty({ message: 'The team name is required' }),
})

export function addPlayerByGroup(newPlayer: PlayerStorageDTO, group: string) {
  playerSchema.parse(newPlayer)
  groupSchema.parse(group)

  const storedPlayers = getPlayersByGroup(group)

  const playerAlreadyExists = storedPlayers.some(
    (player) => player.name === newPlayer.name,
  )

  if (playerAlreadyExists) {
    throw new AppError('This Player already included in the Team.')
  }

  const newStoredPlayers = JSON.stringify([...storedPlayers, newPlayer])

  localStorage.set(`${PLAYER_COLLECTION}-${group}`, newStoredPlayers)
}
