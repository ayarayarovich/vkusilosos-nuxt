export interface succesAuthDto {
  user: {
    userId: number
    phone: string
  }
  accessToken: string
  refreshToken: string
}

export interface Cart {
  id: number
  cart: string
}

export interface User {
  adres_id: number
  birthday?: string
  bonuses: number
  carts: Cart[]
  count_in_basket: number
  email: string
  email_pushes: boolean
  get_pushes: boolean
  sms_pushes: boolean
  status_pushes: boolean
  name: string
  phone: string
  rest_id: number
  total_basket: number
}

export interface SetUser {
  status_pushes?: boolean
  get_pushes?: boolean
  email_pushes?: boolean
  sms_pushes?: boolean
  birthday?: string
  name?: string
  adres?: number
  rest?: number
  email?: string
  last_password?: string
  new_password?: string
  phone?: string
}

export interface Order {
  id: number
  price: number
  status: string
  created_at: string
}
