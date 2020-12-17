export function setCssVariable(variable: string, value: string) {
  document.documentElement.style.setProperty(variable, value)
}
