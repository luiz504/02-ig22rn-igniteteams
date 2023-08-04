import { z } from 'zod'

export const teamSchema = z.object({
  id: z.string().nonempty(),
  name: z.string().min(3),
  players: z.array(z.string()),
})

export type Team = z.infer<typeof teamSchema>
