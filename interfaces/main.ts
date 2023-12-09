export interface Banner {
  id: number
  link: string
  img: string
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
}