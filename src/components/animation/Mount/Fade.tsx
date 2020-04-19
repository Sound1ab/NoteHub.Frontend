import './fade.css'

import React, { ReactNode } from 'react'
import { CSSTransition as UnstyledCSSTransition } from 'react-transition-group'

interface IFade {
  children: ReactNode
  show: boolean
}

export function Fade({ children, show }: IFade) {
  return (
    <UnstyledCSSTransition
      in={show}
      timeout={300}
      classNames="fade"
      mountOnEnter
      unmountOnExit
    >
      {children}
    </UnstyledCSSTransition>
  )
}
