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
  category: number
  name: string
  img: string
  price: number
  weight: number
  count: number
  count_basket: number
  basket_id: number
  color: number
  size: number
  tags: number[] | null
  can_deliver: boolean
}

export interface ExpandedDish {
  id: number
  name: string
  description: string
  img: string
  category: number
  price: number
  weight: number
  pich_cen: number
  belki: number
  ziri: number
  uglevodi: number
  count: number
  color: number
  can_deliver: boolean
  have: boolean
  active: boolean
  size: number
}

export interface DishDetails {
  id: number
  created_at: string
  updated_at: string
  deleted_at: null
  name: string
  description: string
  img: string
  iiko_id: string
  category: number
  vars: null
  tags: null
  price: number
  weight: number
  pich_cen: number
  energ_cen: number
  belki: number
  ziri: number
  uglevodi: number
  count: number
  color: number
  size: number
  from_hour: number
  to_hour: number
  can_deliver: boolean
  have: boolean
  active: boolean
}

// Интерфейс для категорий
export interface Category {
  id: number
  name: string
  img: string
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
