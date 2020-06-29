import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faGithub,
  faProductHunt,
  faSoundcloud,
} from '@fortawesome/free-brands-svg-icons'
import {
  faBook,
  faChevronDown,
  faChevronRight,
  faComment,
  faEdit,
  faEllipsisH,
  faEnvelope,
  faExternalLinkAlt,
  faEyeDropper,
  faFile,
  faFolder,
  faGripLinesVertical,
  faImage,
  faMoon,
  faPen,
  faPenSquare,
  faPlusCircle,
  faSignOutAlt,
  faSpinner,
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
  faExternalLinkAlt,
  faChevronRight,
  faChevronDown,
  faEllipsisH,
  faGripLinesVertical,
  faProductHunt,
  faEdit,
  faPen,
  faImage,
  faSignOutAlt,
  faFile,
  faFolder,
  faSpinner,
  faEyeDropper
)

interface IIconProvider {
  children?: ReactNode
}

export function IconProvider({ children }: IIconProvider) {
  return <>{children}</>
}
