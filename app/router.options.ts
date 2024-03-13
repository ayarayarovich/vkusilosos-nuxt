import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior: (to, from, savedPosition) => {
    if (Object.keys(to.query) || Object.keys(from.query)) {
      return {}
    }

    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, left: 0 }
    }
  },
}
