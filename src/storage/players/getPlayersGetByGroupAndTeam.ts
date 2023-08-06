import { z } from 'zod'
import { getPlayersByGroup } from './getPlayersByGroup'

const groupNameSchema = z
  .string()
  .min(1, { message: 'Group name is required.' })
const teamNameSchema = z.string().min(1, { message: 'Team name is required.' })

export function getPlayerByGroupAndTeam(groupName: string, teamName: string) {
  groupNameSchema.parse(groupName)
  teamNameSchema.parse(teamName)

  const storedGroup = getPlayersByGroup(groupName)

  const players = storedGroup.filter((player) => player.team === teamName)

  return players
}
