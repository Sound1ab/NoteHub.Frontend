import { TREE, resolveRef, status, statusMatrix, walk } from 'isomorphic-git'

import { fs } from '../lightningFS'

export interface IStatus {
  dir: string
}

export interface IStatusForFile {
  filepath: string
}

export async function getStatus({ dir }: IStatus) {
  return statusMatrix({ fs, dir })
}

enum STATUS {
  FILE,
  HEAD,
  WORKDIR,
  STAGE,
}

export async function getStatusForFile({ filepath }: IStatusForFile) {
  const pathParts = filepath.split('/')
  const slug = pathParts.pop()
  const dir = `/${pathParts.join('/')}`

  if (!slug) {
    throw new Error('filepath not found')
  }

  return await status({
    dir,
    filepath: slug,
    fs,
  })
}

export async function getUnstagedChanges({ dir }: IStatus): Promise<string[]> {
  const result = await statusMatrix({ fs, dir })

  return result
    .filter((row) => row[STATUS.WORKDIR] !== row[STATUS.STAGE])
    .map((row) => row[STATUS.FILE])
}

export async function getDeletedUnstagedChanges({ dir }: IStatus) {
  const result = await statusMatrix({ fs, dir })

  return result
    .filter((row) => row[STATUS.HEAD] === row[STATUS.STAGE])
    .map((row) => row[STATUS.FILE])
}

export interface IGetCommittedChanges {
  dir: string
}

export async function getCommittedChanges({ dir }: IGetCommittedChanges) {
  const currentCommit = await resolveRef({ fs, dir, ref: 'HEAD' })

  const currentRemoteCommit = await resolveRef({
    fs,
    dir,
    ref: 'refs/remotes/origin/main',
  })

  const changedFiles = await getFileStateChanges({
    dir,
    startCommit: currentRemoteCommit,
    endCommit: currentCommit,
  })

  return changedFiles ? changedFiles : []
}

interface IGetFileStateChanges {
  dir: string
  startCommit: string
  endCommit: string
}

async function getFileStateChanges({
  dir,
  startCommit,
  endCommit,
}: IGetFileStateChanges): Promise<string[] | undefined> {
  return walk({
    fs,
    dir,
    trees: [TREE({ ref: startCommit }), TREE({ ref: endCommit })],
    map: async function (filepath, entries) {
      if (!entries || entries.length === 0) {
        return
      }

      const [A, B] = entries

      // ignore directories
      if (filepath === '.') {
        return
      }
      if ((await A?.type()) === 'tree' || (await B?.type()) === 'tree') {
        return
      }

      // generate ids
      const Aoid = await A?.oid()
      const Boid = await B?.oid()

      // determine modification type
      let type = 'equal'
      if (Aoid !== Boid) {
        type = 'modify'
      }
      if (Aoid === undefined) {
        type = 'add'
      }
      if (Boid === undefined) {
        type = 'remove'
      }
      if (Aoid === undefined && Boid === undefined) {
        throw new Error('File does not exist in either start or end commit')
      }

      return type === 'equal' ? null : filepath
    },
  })
}
