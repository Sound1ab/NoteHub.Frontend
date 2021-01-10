import {
  IReadDir,
  IReadDirRecursive,
  IReadFile,
  IRename,
  IUnlink,
  IWriteFile,
} from '../lightningFS'
import {
  readDir as fsReadDir,
  readDirRecursive as fsReadDirRecursive,
  readFile as fsReadFile,
  rename as fsRename,
  unlink as fsUnlink,
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

export async function readDirRecursive(options: IReadDirRecursive) {
  return fsReadDirRecursive(options)
}

export async function unlink(options: IUnlink) {
  return fsUnlink(options)
}
