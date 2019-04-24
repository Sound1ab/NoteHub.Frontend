import { useEffect, useState } from 'react'

export function useData<T>(url = 'shows.json'): [T | [], boolean] {
  const [data, setData] = useState<T | []>([])
  const [loading, setLoading] = useState(true)

  async function fetchUrl() {
    const response = await fetch(url)
    const json = await response.json()
    setData(json)
    setLoading(false)
  }

  useEffect(() => {
    fetchUrl()
  }, [])

  return [data, loading]
}
