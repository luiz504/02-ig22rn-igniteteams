import { z } from 'zod'
import { GROUP_COLLECTION } from '../config'
import { localStorage } from '@/libs/mmkv'

const groupDataSchema = z.array(z.string().nonempty())
export function setGroupsStored(data: string[]) {
  groupDataSchema.parse(data)

  localStorage.set(GROUP_COLLECTION, JSON.stringify(data))
}

export function getGroupsStored() {
  return localStorage.getString(GROUP_COLLECTION)
}
