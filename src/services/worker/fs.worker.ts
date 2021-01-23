import { IUnlink, unlink as fsUnlink } from '../lightningFS/delete'
import {
  IReadDir,
  IReadDirRecursive,
  IReadFile,
  readDir as fsReadDir,
  readDirRecursive as fsReadDirRecursive,
  readFile as fsReadFile,
} from '../lightningFS/read'
import { IRename, rename as fsRename } from '../lightningFS/rename'
import { IWriteFile, writeFile as fsWriteFile } from '../lightningFS/write'

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
