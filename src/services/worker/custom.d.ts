/* ./worker/custom.d.ts */

declare module 'comlink-loader!*' {
  import { IMessage } from '../../types'
  import { Retext_Settings } from '../../components/apollo'

  class WebpackWorker extends Worker {
    constructor()

    // Add any custom functions to this class.
    // Make note that the return type needs to be wrapped in a promise.
    processData(
      data: string,
      retextSettings: Retext_Settings[]
    ): Promise<IMessage[]>
  }

  export = WebpackWorker
}
