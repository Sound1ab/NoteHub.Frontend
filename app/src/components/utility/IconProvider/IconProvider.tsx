import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faSoundcloud } from '@fortawesome/free-brands-svg-icons'
import {
  faBook,
  faComment,
  faEnvelope,
  faExternalLinkAlt,
  faMoon,
  faPenSquare,
  faPlusCircle,
  faSync,
  faTimes,
  faTrash,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import React, { ReactNode } from 'react'

library.add(
  faGithub as any,
  faSoundcloud as any,
  faEnvelope,
  faUser,
  faMoon,
  faComment,
  faPenSquare,
  faBook,
  faPlusCircle,
  faSync,
  faTrash,
  faTimes,
  faExternalLinkAlt
)

interface IIconProvider {
  children?: ReactNode
}

export function IconProvider({ children }: IIconProvider) {
  return <>{children}</>
}
