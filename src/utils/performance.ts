export function start(name: string) {
  performance.mark(`${name}Start`)
}

export function end(name: string) {
  performance.mark(`${name}End`)
}

export function measure(name: string) {
  performance.measure(`${name}Measure`, `${name}Start`, `${name}End`)
}

function getEntry(name: string) {
  performance.getEntriesByName(`${name}Measure`)
}

export async function doMeasure(name: string, callback: any) {
  start(name)
  await callback()
  end(name)
  measure(name)
  console.log(getEntry(name))
}
