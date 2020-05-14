import { Base64 } from 'js-base64'

export function parseJwt(token: string) {
  try {
    return JSON.parse(Base64.decode(token.split('.')[1]))
  } catch (e) {
    return null
  }
}
