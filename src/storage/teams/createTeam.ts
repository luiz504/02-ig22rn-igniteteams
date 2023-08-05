import { z } from 'zod'

import { TEAM_COLLECTION } from '../config'
import { getAllTeams } from './getallTeams'

import { localStorage } from '@/libs/mmkv'
import { AppError } from '@/utils/AppError'
export function createTeam(teamName: string) {
  const nameSchema = z
    .string()
    .nonempty({ message: 'Team name is required' })
    .max(30, { message: 'Team Name must have a maximum of 20 characters' })

  const trimmedValue = teamName.trim()
  nameSchema.parse(trimmedValue)

  const storedTeams = getAllTeams()

  const teamAlreadyExists = storedTeams.find(
    (t) => t.toLowerCase() === trimmedValue.toLowerCase(),
  )

  if (teamAlreadyExists) throw new AppError('Team  name already in use.')

  const newTeams = [...storedTeams, teamName]
  localStorage.set(TEAM_COLLECTION, JSON.stringify(newTeams))

  return teamName
}
