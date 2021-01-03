import { IReadDir } from '../lightningFS'
import { readDir as fsReadDir } from '../lightningFS'

export async function readDir({ filepath }: IReadDir) {
  console.log('in the worke!')
  return fsReadDir({ filepath })
}
