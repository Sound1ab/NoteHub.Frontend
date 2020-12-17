export function getCssVariable(variable: string) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim()
}
