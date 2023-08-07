import { getPlayersByGroup } from './getPlayersByGroup'
import { AppError } from '@/utils/AppError'
import { setPlayersStored } from '../utils/playersHelpers'
import { PlayerStorageDTO } from '../models/PlayerStorageDTO'

export function addPlayerByGroup(
  newPlayer: PlayerStorageDTO,
  groupName: string,
) {
  const storedPlayers = getPlayersByGroup(groupName)

  const playerAlreadyExists = storedPlayers.some(
    (player) => player.name === newPlayer.name,
  )

  if (playerAlreadyExists) {
    throw new AppError('This Player already included in the Team.')
  }
  const updatedGroup = [...storedPlayers, newPlayer]

  setPlayersStored(groupName, updatedGroup)
}
