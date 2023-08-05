import { z } from 'zod'

import { localStorage } from '@/libs/mmkv'
import { PlayerStorageDTO } from './PlayerStorageDTO'
import { PLAYER_COLLECTION } from '../config'
import { getPlayersByTeam } from './getPlayersByTeam'
import { AppError } from '@/utils/AppError'

const teamSchema = z.string().nonempty({ message: 'The team name is required' })

const playerSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'The player name must have at least 3 characters' }),
  team: teamSchema,
})

export function addPlayerByTeam(newPlayer: PlayerStorageDTO, team: string) {
  playerSchema.parse(newPlayer)

  const storedPlayers = getPlayersByTeam(team)

  const playerAlreadyExists = storedPlayers.some(
    (player) => player.name === newPlayer.name,
  )

  if (playerAlreadyExists) {
    throw new AppError('This Player already included in the Team.')
  }

  const newStoredPlayers = JSON.stringify([...storedPlayers, newPlayer])

  localStorage.set(`${PLAYER_COLLECTION}-${team}`, newStoredPlayers)
}
