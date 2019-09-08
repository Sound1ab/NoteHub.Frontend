import path from "path"

const isDev = process.env.NODE_ENV === 'development'

if (isDev) {
  // tslint:disable-next-line:no-var-requires
  require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
}
