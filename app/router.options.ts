import type { RouterConfig } from '@nuxt/schema'
import PrivacyPolicy from '~/pages/privacy_policy.vue'
import UserAgreement from '~/pages/user_agreement.vue'
import PublicOfferta from '~/pages/public_offerta.vue'
import DeliveryConditions from '~/pages/delivery_conditions.vue'

export default <RouterConfig>{
  // https://router.vuejs.org/api/interfaces/routeroptions.html#routes
  routes: (_routes) => {
    const index = _routes.find((r) => r.path === '/')

    if (index) {
      index.children = [
        {
          path: 'privacy_policy',
          component: PrivacyPolicy,
        },
        {
          path: 'public_offerta',
          component: PublicOfferta,
        },
        {
          path: 'user_agreement',
          component: UserAgreement,
        },
        {
          path: 'delivery_conditions',
          component: DeliveryConditions,
        },
      ]
    }

    return _routes
  },
  scrollBehavior: (to, from, savedPosition) => {
    // do nothing routes
    const modals = ['/privacy_policy', '/public_offerta', '/user_agreement', '/delivery_conditions']
    if (modals.includes(to.path) || modals.includes(from.path)) {
      return {}
    }

    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, left: 0 }
    }
  },
}
