import React, { ReactNode } from 'react'

import { getLoginLink } from '../../../../utils/getLoginLink'
import { GithubButton } from '../../../atoms/Button/Button'

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
