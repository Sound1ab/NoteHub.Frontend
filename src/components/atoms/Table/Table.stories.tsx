import React, { useEffect } from 'react'

import { useSlateValue } from '../../../hooks/recoil/useSlateValue'
import { Slate } from '../../templates/Dashboard/Editor/Slate/Slate'

export const Table = () => {
  const [, setSlateValue] = useSlateValue()

  useEffect(() => {
    setSlateValue([slateTable] as any)
  }, [setSlateValue])

  return <Slate />
}

const slateTable = {
  type: 'table',
  children: [
    {
      type: 'tableRow',
      header: true,
      children: [
        {
          type: 'tableCell',
          children: [
            {
              text: 'Content',
            },
          ],
        },
        {
          type: 'tableCell',
          children: [
            {
              text: 'asdf',
            },
          ],
        },
        {
          type: 'tableCell',
          children: [
            {
              text: 'fadsf',
            },
          ],
        },
      ],
    },
    {
      type: 'tableRow',
      children: [
        {
          type: 'tableCell',
          children: [
            {
              text: 'Content',
            },
          ],
        },
        {
          type: 'tableCell',
          children: [
            {
              text: 'fasdfasdf',
            },
          ],
        },
        {
          type: 'tableCell',
          children: [
            {
              text: 'afsdfasdf',
            },
          ],
        },
      ],
    },
    {
      type: 'tableRow',
      footer: true,
      children: [
        {
          type: 'tableCell',
          children: [
            {
              text: 'Content',
            },
          ],
        },
        {
          type: 'tableCell',
          children: [
            {
              text: 'Content',
            },
          ],
        },
        {
          type: 'tableCell',
          children: [
            {
              text: 'Content',
            },
          ],
        },
      ],
    },
  ],
  align: [null, null, null],
}

export default {
  title: 'Components/Table',
  component: Table,
}
