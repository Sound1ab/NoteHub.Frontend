import { CONTAINER_ID } from '../enums'

export function scrollIntoView(id: CONTAINER_ID) {
  const element = document.getElementById(id)
  element!.scrollIntoView({ behavior: 'smooth', inline: 'nearest' })
}
