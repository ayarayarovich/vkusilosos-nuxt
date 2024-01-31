import axios from 'axios'
import { useUserCredentials, useSignOut } from '~/composables/api/user'

export default defineNuxtPlugin(() => {
  const { baseAPIURL: baseURL } = useAppConfig()
  const { userCredentials } = useUserCredentials()
  const signOut = useSignOut()

  const axiosPublic = axios.create({
    baseURL,
  })

  const axiosPrivate = axios.create({
    baseURL,
  })

  axiosPrivate.interceptors.request.use(
    (config) => {
      if (userCredentials.value.isAuthenticated) {
        // eslint-disable-next-line dot-notation
        config.headers['Authorization'] = 'Bearer ' + userCredentials.value.accessToken
      } else {
        // resetUserCredentials()
        signOut()
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  axiosPrivate.interceptors.response.use(
    (res) => res,
    async (err) => {
      const originalConfig = err.config
      if (err.response) {
        if (
          (err.response.status === 403 || err.response.status === 401) &&
          !originalConfig._retry &&
          userCredentials.value.isAuthenticated &&
          userCredentials.value.refreshToken.length
        ) {
          originalConfig._retry = true

          try {
            const rs = await axiosPrivate.post('/api/refresh', {
              refreshToken: userCredentials.value.refreshToken,
            })
            const { accessToken, refreshToken } = rs.data
            userCredentials.value = {
              accessToken,
              refreshToken,
              isAuthenticated: true,
            }

            // eslint-disable-next-line dot-notation
            axiosPrivate.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken

            return axiosPrivate(originalConfig)
          } catch (_error: any) {
            if (_error.response && _error.response.data) {
              signOut()
              return Promise.reject(_error)
            }

            signOut()
            return Promise.reject(_error)
          }
        } else {
          return Promise.reject(err)
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
