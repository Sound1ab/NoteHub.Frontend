import { IReadDir, IReadFile, IWriteFile } from '../../lightningFS'
import {
  readDir as fsReadDir,
  readFile as fsReadFile,
  writeFile as fsWriteFile,
} from '../../lightningFS'

export async function readDir({ filepath }: IReadDir) {
  return fsReadDir({ filepath })
}

export async function readFile({ filepath }: IReadFile) {
  return fsReadFile({ filepath })
}

export async function writeFile({ filepath, content }: IWriteFile) {
  return fsWriteFile({ filepath, content })
}
