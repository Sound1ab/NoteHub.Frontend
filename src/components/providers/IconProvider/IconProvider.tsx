import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faGithub,
  faProductHunt,
  faSoundcloud,
} from '@fortawesome/free-brands-svg-icons'
import {
  faBars,
  faBold,
  faBook,
  faChevronDown,
  faChevronRight,
  faCode,
  faColumns,
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
  faItalic,
  faLink,
  faList,
  faListOl,
  faMinus,
  faMoon,
  faPen,
  faPenSquare,
  faPlusCircle,
  faQuoteRight,
  faSignOutAlt,
  faSpinner,
  faSync,
  faTable,
  faTimes,
  faTrash,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import React, { ReactNode } from 'react'

library.add(
  faGithub,
  faSoundcloud,
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
  faEyeDropper,
  faListOl,
  faCode,
  faList,
  faItalic,
  faBold,
  faMinus,
  faQuoteRight,
  faColumns,
  faLink,
  faTable,
  faBars
)

interface IIconProvider {
  children?: ReactNode
}

export function IconProvider({ children }: IIconProvider) {
  return <>{children}</>
}
