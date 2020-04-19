import { CONTAINER_ID } from '../enums'

export function scrollIntoView(id: CONTAINER_ID) {
  const element = document.getElementById(id)

  if (!element) {
    return
  }

  element.scrollIntoView({
    behavior: 'smooth',
    inline: 'center',
    block: 'center',
  })
}
