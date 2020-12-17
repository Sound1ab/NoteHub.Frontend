import React, { ChangeEvent, useState } from 'react'
import styled from 'styled-components'

import { getCssVariable, setCssVariable } from '../../../../utils'

export function ColorPickerItem() {
  const [value, setValue] = useState(getCssVariable('--accent-primary'))

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    const variable = '--accent-primary'

    const { value } = e.target

    setCssVariable(variable, value)

    setValue(getCssVariable(variable))
  }

  return (
    <Swatch id="swatch" type="color" value={value} onChange={handleOnChange} />
  )
}

const Swatch = styled.input`
  padding: 0;
`
