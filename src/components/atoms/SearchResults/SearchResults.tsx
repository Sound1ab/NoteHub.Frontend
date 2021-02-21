import Fuse from 'fuse.js'
import React, { ReactNode } from 'react'

interface ISearchResults<T> {
  search: string
  data?: T[] | null
  keys: string[]
  children: (results: { item: T }[]) => ReactNode
}

export function SearchResults<T>({
  search,
  data,
  keys,
  children,
}: ISearchResults<T>) {
  if (!data) {
    return <>{children([])}</>
  }

  if (!search) {
    return <>{children(data.map((item) => ({ item })))}</>
  }

  const fuse = new Fuse(data, {
    keys,
    threshold: 0.5,
  })

  const results = fuse.search<T>(search)

  return <>{children(results)}</>
}
