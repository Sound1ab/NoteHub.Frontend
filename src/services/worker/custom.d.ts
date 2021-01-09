/* ./worker/custom.d.ts */

import { PushResult } from 'isomorphic-git'

import {
  IClone,
  ICommit,
  ICommittedChanges,
  IListFiles,
  IPush,
  IRollback,
  IStageChange,
  IStageChanges,
  IStatus,
} from '../git'
import { IWriteFile } from '../lightningFS'

declare module 'comlink-loader!*' {
  import { IMessage } from '../../types'
  import { Retext_Settings } from '../../components/apollo'
  import { IReadDir, IReadFile } from '../lightningFS'

  class WebpackWorker extends Worker {
    constructor()

    // Add any custom functions to this class.
    // Make note that the return type needs to be wrapped in a promise.
    processData(
      data: string,
      retextSettings: Retext_Settings[]
    ): Promise<IMessage[]>

    // git
    clone(options: Pick<IClone, 'url' | 'dir'>): Promise<void>
    listFiles(options: IListFiles): Promise<any>
    status(
      options: IStatus
    ): Promise<[string, 0 | 1, 0 | 1 | 2, 0 | 1 | 2 | 3][]>
    unstagedChanges(options: IStatus): Promise<string[]>
    stageChanges(options: IStageChanges): Promise<void>
    commit(options: ICommit): Promise<void>
    rollback(options: IRollback): Promise<void>
    committedChanges(options: ICommittedChanges): Promise<void>
    push(options: IPush): Promise<PushResult>
    stageChange(options: IStageChange): Promise<void>

    // fs
    readDir(options: IReadDir): Promise<string[]>
    readFile(options: IReadFile): Promise<string>
    writeFile(options: IWriteFile): Promise<void>
  }

  export = WebpackWorker
}
