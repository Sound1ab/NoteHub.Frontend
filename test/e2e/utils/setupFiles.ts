import path from 'path'

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({
  path: path.join(__dirname, '../../../.env.development.local'),
})
