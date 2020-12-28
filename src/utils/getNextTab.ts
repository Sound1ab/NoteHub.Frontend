export function getNextTab(tabs: string[], tab: string) {
  const index = tabs.findIndex((nextTab) => nextTab === tab)

  const leftTab = tabs[index - 1]
  const rightTab = tabs[index + 1]

  return leftTab || rightTab || undefined
}
