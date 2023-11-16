export interface AdditionalInfo {
  id: number
  name: string
  imgId: number
}

export interface Tag {
  id: number
  name: string
  img: string
}

export interface Dish {
  id: number
  name: string
  price: number
  newPrice: number
  img: string
  spice: boolean
  description: string
  weight: number
  big: boolean
  additionalInfo: AdditionalInfo[]
  tags: Tag[]
}

// Интерфейс для категорий
export interface Category {
  id: number
  name: string
  img: string
  have_tags: boolean
}

// Интерфейс для вариаций блюд
export interface DishesVariation {
  id: number
  price: number
  name: string
  description: string
  active: boolean
}

// Интерфейс для добавок к блюдам
export interface DishesAdditional {
  id: number
  name: string
  price: number
  active: boolean
}
