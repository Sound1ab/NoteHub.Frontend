import React, { ReactNode } from 'react'

import { getLoginLink } from '../../../../utils'
import { GithubButton } from '../../../atoms'

interface ISignUpButton {
  children: ReactNode
  className?: string
}

export function SignUpButton({ children, className }: ISignUpButton) {
  return (
    <GithubButton
      className={className}
      as="a"
      href={getLoginLink()}
      target="_self"
      rel="noopener"
    >
      {children}
    </GithubButton>
  )
}
