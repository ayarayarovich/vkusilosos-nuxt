export interface Banner {
  id: number
  link: string
  img: string
  phone_img: string
}

export interface StoryItem {
  id: number
  img: string
  text: string
}

export interface Story {
  id: number
  preview: string
  story_items: StoryItem[]
}

export interface DishInBasket {
  id: number
  dish_id: number
  name: string
  price: number
  count: number
  img: string
  weight: number
  count_in: number
  gift_id: string
}

export interface Address {
  user_id: number
  adres: string
  code: string
  comment: string
  created_at: string
  deleted_at: string | null
  floor: number
  full: string
  house: string
  id: number
  latitude: number
  longitude: number
  podezd: string
  updated_at: string
}
