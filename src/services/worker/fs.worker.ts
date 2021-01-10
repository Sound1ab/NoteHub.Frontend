import { IReadDir, IReadFile, IRename, IWriteFile } from '../lightningFS'
import {
  readDir as fsReadDir,
  readFile as fsReadFile,
  rename as fsRename,
  writeFile as fsWriteFile,
} from '../lightningFS'

export async function readDir(options: IReadDir) {
  return fsReadDir(options)
}

export async function readFile(options: IReadFile) {
  return fsReadFile(options)
}

export async function writeFile(options: IWriteFile) {
  return fsWriteFile(options)
}

export async function rename(options: IRename) {
  return fsRename(options)
}
