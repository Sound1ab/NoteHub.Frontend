import React, { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'

interface IRouter {
  children: ReactNode
}

export function Router({ children }: IRouter) {
  return (
    <BrowserRouter>
      <>{children}</>
    </BrowserRouter>
  )
}
