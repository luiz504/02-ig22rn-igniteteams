import { getPlayersByGroup } from './getPlayersByGroup'
import { AppError } from '@/utils/AppError'
import { setPlayersStored } from '../utils/playersHelpers'
import { PlayerStorageDTO } from '../models/PlayerStorageDTO'

export function addPlayerByGroup(
  newPlayer: PlayerStorageDTO,
  groupName: string,
) {
  const storedPlayers = getPlayersByGroup(groupName)

  const playerAlreadyStored = storedPlayers.find(
    (player) => player.name === newPlayer.name,
  )

  if (playerAlreadyStored) {
    throw new AppError(
      `This Player already included in the "${playerAlreadyStored.team}".`,
    )
  }
  const updatedGroup = [...storedPlayers, newPlayer]

  setPlayersStored(groupName, updatedGroup)
}
