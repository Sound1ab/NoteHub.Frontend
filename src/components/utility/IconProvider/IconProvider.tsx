import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faGithub,
  faProductHunt,
  faSoundcloud,
} from '@fortawesome/free-brands-svg-icons'
import {
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
  faTimes,
  faTrash,
  faUser,
  faLink,
  faTable,
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
  faTable
)

interface IIconProvider {
  children?: ReactNode
}

export function IconProvider({ children }: IIconProvider) {
  return <>{children}</>
}
