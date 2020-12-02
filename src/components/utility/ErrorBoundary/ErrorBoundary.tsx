import React, { Component, ErrorInfo, ReactNode } from 'react'

interface IProps {
  children: ReactNode
  fallback: (errorMessage: string) => ReactNode
}

interface IState {
  hasError: boolean
  errorMessage: string
}

export class ErrorBoundary extends Component<IProps, IState> {
  public state: IState = {
    hasError: false,
    errorMessage: '',
  }

  public static getDerivedStateFromError(error: Error): IState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, errorMessage: error.message }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback(this.state.errorMessage)
    }

    return this.props.children
  }
}
