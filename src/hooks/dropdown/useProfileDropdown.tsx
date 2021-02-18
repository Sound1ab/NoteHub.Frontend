import { useLogout } from '../authorization/useLogout'
import { useReadGithubUser } from '../user/useReadGithubUser'

export function useProfileDropdown() {
  const [logout, { called, data, error }] = useLogout()
  const user = useReadGithubUser()

  if (error) {
    alert('Could not logout. Please try again.')
  }

  function gitlink() {
    window.open(user?.html_url)
  }

  async function handleLogout() {
    await logout()
  }

  const items = [
    {
      heading: 'Account',
      icon: 'github' as const,
      prefix: 'fab' as const,
      label: 'Github',
      onClick: gitlink,
    },
    {
      icon: 'sign-out-alt' as const,
      label: 'Logout',
      onClick: handleLogout,
    },
  ]

  return { items, logout: data?.logout, called }
}
