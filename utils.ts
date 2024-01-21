export const formatPhone = (phone: string) => {
  return phone.replace(/\D+/g, '').replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3 - $4 - $5')
}

export function pad(n: number, size: number) {
  let num = n.toString()
  while (num.length < size) num = '0' + num
  return num
}

export function nthIndex(str: string, pattern: string, n: number) {
  const L = str.length
  let i = -1
  while (n-- && i++ < L) {
    i = str.indexOf(pattern, i)
    if (i < 0) break
  }
  return i
}

export function getFirstNItems<T>(items: T[], n: number) {
  return items.slice(0, n)
}
