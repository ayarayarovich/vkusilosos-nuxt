import axios from 'axios'
import { useUserStore } from '~/store/user'

export default defineNuxtPlugin(() => {
  const { baseAPIURL: baseURL } = useAppConfig()
  const pinia = usePinia()

  const axiosPublic = axios.create({
    baseURL,
  })

  const axiosPrivate = axios.create({
    baseURL,
  })

  axiosPrivate.interceptors.request.use(
    (config) => {
      const userStore = useUserStore(pinia)
      if (userStore.isAuthenticated) {
        // eslint-disable-next-line dot-notation
        config.headers['Authorization'] = `Bearer ${userStore.accessToken}`
      } else {
        userStore.signOut()
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  axiosPrivate.interceptors.response.use(
    (res) => res,
    async (err) => {
      const userStore = useUserStore(pinia)

      const originalConfig = err.config
      if (err.response) {
        if ((err.response.status === 403 || err.response.status === 401) && !originalConfig._retry) {
          originalConfig._retry = true

          try {
            const rs = await axiosPrivate.post('/api/refresh', {
              refreshToken: userStore.refreshToken,
            })
            const { accessToken, refreshToken } = rs.data
            userStore.accessToken = accessToken
            userStore.refreshToken = refreshToken

            // eslint-disable-next-line dot-notation
            axiosPrivate.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

            return axiosPrivate(originalConfig)
          } catch (_error: any) {
            if (_error.response && _error.response.data) {
              userStore.isAuthenticated = false
              return Promise.reject(_error.response.data)
            }

            userStore.isAuthenticated = false
            return Promise.reject(_error)
          }
        }
      }
    }
  )

  return {
    provide: {
      axiosPublic,
      axiosPrivate,
    },
  }
})
