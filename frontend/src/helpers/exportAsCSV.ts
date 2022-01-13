export const exportAsCsv = (column: any[], rows: any[]) => {
  const delimiter = ';'
  let exp: string
  const cols = column
    .map((col) => col.id)
    .filter((str) => !!str && str !== 'id')
  exp = cols.join(delimiter) + '\n'

  rows.forEach((row) => {
    let r = ''
    cols.forEach((col) => {
      const val = row[col]
      r += (val ? parseDateIfPossible(val) : '') + delimiter
    })
    exp += r.slice(0, -1) + '\n'
  })
  const element = document.createElement('a')
  const file = new Blob([exp], {
    type: 'text/plain',
  })
  element.href = URL.createObjectURL(file)
  element.download = 'export.csv'
  document.body.appendChild(element)
  element.click()
}

const parseDateIfPossible = (s: string) => {
  if (typeof s !== 'string') return s
  return s.endsWith('00:00.000Z') ? new Date(s).toLocaleDateString('sk-SK') : s
}
