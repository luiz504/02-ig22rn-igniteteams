import { z } from 'zod'
import { getPlayersByGroup } from './getPlayersByGroup'

const teamNameSchema = z.string().nonempty({ message: 'teamName is required.' })

export function getPlayerByGroupAndTeam(groupName: string, teamName: string) {
  teamNameSchema.parse(teamName)

  const storedGroup = getPlayersByGroup(groupName)

  const players = storedGroup.filter((player) => player.team === teamName)

  return players
}
