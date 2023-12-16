export const formatPhone = (phone: string) => {
  return phone.replace(/\D+/g, '').replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5')
}

export function pad(n: number, size: number) {
  let num = n.toString()
  while (num.length < size) num = '0' + num
  return num
}
