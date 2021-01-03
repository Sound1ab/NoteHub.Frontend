import { gitClone } from '../git'

export async function clone() {
  console.log('in the worke!')
  return gitClone({
    url: 'https://github.com/isomorphic-git/lightning-fs',
    onProgress: (progress) => console.log('here', progress),
  })
}
