import * as React from 'react'
import { ReactNode } from 'react'

import { ISwitch, Switch } from './Switch'

// this switch implements a checkbox input and is not relevant for this example
interface IContextProps {
  on: boolean
  toggle: () => void
}

const ToggleContext = React.createContext<Partial<IContextProps>>({})

function useEffectAfterMount(cb: () => void, otherDependencies: unknown[]) {
  const justMounted = React.useRef(true)

  const dependencies = [cb, ...otherDependencies]

  React.useEffect(() => {
    if (!justMounted.current) {
      return cb()
    }

    justMounted.current = false
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)
}

interface IToggle {
  onToggle: (on: boolean) => void
  children: ReactNode
  initialState?: boolean
}

export function Toggle({ children, onToggle, initialState = false }: IToggle) {
  const [on, setOn] = React.useState(initialState)

  const toggle = React.useCallback(() => setOn((oldOn) => !oldOn), [])

  useEffectAfterMount(() => {
    onToggle(on)
  }, [on])

  const value = React.useMemo(() => ({ on, toggle }), [toggle, on])

  return (
    <ToggleContext.Provider value={value}>{children}</ToggleContext.Provider>
  )
}

function useToggleContext() {
  const context = React.useContext(ToggleContext)

  if (!context) {
    throw new Error(
      `Toggle compound components cannot be rendered outside the Toggle component`
    )
  }

  return context
}

export function ToggleButton({ id }: Pick<ISwitch, 'id'>) {
  const { on, toggle } = useToggleContext()

  return <Switch on={on} onClick={toggle} id={id} />
}
