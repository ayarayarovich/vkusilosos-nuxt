export interface succesAuthDto {
  user: {
    userId: number
    phone: string
  }
  accessToken: string
  refreshToken: string
}

export interface User {
  adres_id: number
  birthday: string
  bonuses: number
  carts: unknown[],
  count_in_basket: number,
  email: string,
  email_pushes: boolean
  get_pushes: boolean
  sms_pushes: boolean
  status_pushes: boolean
  name: string
  phone: string
  rest_id: number
  total_basket: number
}