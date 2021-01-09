import {
  MessageCallback,
  ProgressCallback,
  TREE,
  add,
  checkout,
  clone as gitClone,
  commit as gitCommit,
  push as gitPush,
  resolveRef,
  statusMatrix,
  walk,
} from 'isomorphic-git'
import http from 'isomorphic-git/http/web'

import { Node_Type } from '../../components/apollo/generated_components_typings'
import { fs } from '../lightningFS'
import { IGitTreeNode } from './types'

export interface IClone {
  url: string
  dir: string
  onMessage?: MessageCallback
  onProgress?: ProgressCallback
}

export async function clone({ url, dir, onMessage, onProgress }: IClone) {
  await gitClone({
    fs,
    http,
    dir,
    url,
    onMessage,
    onProgress,
    corsProxy: process.env.REACT_APP_PROXY,
  })
}

export interface IListFiles {
  optimisticPaths: string[]
  dir: string
}

export async function listFiles({
  dir,
  optimisticPaths,
}: IListFiles): Promise<IGitTreeNode> {
  const trees = [TREE({ ref: 'HEAD' })]

  return await walk({
    fs,
    dir,
    trees,
    map: async (filepath, entries) => {
      if (!entries || entries.length === 0) {
        return
      }

      const [entry] = entries

      const type = await entry.type()

      if (type === 'commit' || type === 'special') {
        return
      }

      let gitHubType

      switch (type) {
        case 'blob':
          gitHubType = Node_Type.File
          break
        case 'tree':
          gitHubType = Node_Type.Folder
          break
      }

      return {
        path: filepath,
        isOptimistic: optimisticPaths.includes(filepath),
        type: gitHubType,
      }
    },
  })
}

export interface IStatus {
  dir: string
}

export async function status({ dir }: IStatus) {
  return statusMatrix({ fs, dir })
}

enum STATUS {
  FILE,
  HEAD,
  WORKDIR,
  STAGE,
}

export async function unstagedChanges({ dir }: IStatus): Promise<string[]> {
  const result = await statusMatrix({ fs, dir })

  return result
    .filter((row) => row[STATUS.WORKDIR] !== row[STATUS.STAGE])
    .map((row) => row[STATUS.FILE])
}

export interface IStageChanges {
  dir: string
  unstagedChanges: string[]
}

export async function stageChanges({ dir, unstagedChanges }: IStageChanges) {
  for (const path of unstagedChanges) {
    await add({ fs, dir, filepath: path })
  }
}

export interface IStageChange {
  dir: string
  path: string
}

export async function stageChange({ dir, path }: IStageChange) {
  return await add({ fs, dir, filepath: path })
}

export interface ICommit {
  dir: string
  message?: string
}

export async function commit({
  dir,
  message = `note(update file): ${name} - ${new Date().toDateString()}`,
}: ICommit) {
  return gitCommit({
    fs,
    dir,
    message,
    author: { email: 'pp@pp.com', name: 'sound' },
  })
}

export interface IRollback {
  dir: string
  unstagedChanges: string[]
}

export async function rollback({ dir, unstagedChanges }: IRollback) {
  return checkout({
    fs,
    dir,
    force: true,
    filepaths: unstagedChanges,
  })
}

export interface ICommittedChanges {
  dir: string
}

export async function committedChanges({ dir }: ICommittedChanges) {
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
}: IGetFileStateChanges) {
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

export interface IPush {
  dir: string
}

export async function push({ dir }: IPush) {
  return gitPush({
    fs,
    http,
    dir,
    remote: 'origin',
    ref: 'main',
    onAuth: () => ({ username: process.env.REACT_APP_PAT }),
    corsProxy: process.env.REACT_APP_PROXY,
  })
}
