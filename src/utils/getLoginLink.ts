const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL
const SCOPE = process.env.REACT_APP_SCOPE

export function getLoginLink() {
  const state = Math.random().toString(36).substr(2)

  return `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&state=${state}&scope=${SCOPE}`
}
