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

export function isElementInViewport(el: HTMLElement, extended?: boolean) {
  const rect = el.getBoundingClientRect()
  if (extended) {
    return (
      rect.top >= -(window.innerHeight || document.documentElement.clientHeight) &&
      rect.left >= -(window.innerWidth || document.documentElement.clientWidth) &&
      rect.bottom <=
        (window.innerHeight * 2 || document.documentElement.clientHeight * 2) /* or $(window).height() */ &&
      rect.right <= (window.innerWidth * 2 || document.documentElement.clientWidth * 2) /* or $(window).width() */
    )
  }
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) /* or $(window).height() */ &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
  )
}
