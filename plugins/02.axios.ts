import axios from 'axios'
import {useQueryClient} from "@tanstack/vue-query";
import {useUserCredentials} from "~/composables/api/user";

export default defineNuxtPlugin(() => {
  const { baseAPIURL: baseURL } = useAppConfig()
  const {userCredentials, resetUserCredentials} = useUserCredentials()

  const axiosPublic = axios.create({
    baseURL,
  })

  const axiosPrivate = axios.create({
    baseURL,
  })

  axiosPrivate.interceptors.request.use(
    (config) => {
      // const {userCredentials, resetUserCredentials} = useUserCredentials()
      if (userCredentials.value.isAuthenticated) {
        // eslint-disable-next-line dot-notation
        config.headers['Authorization'] = userCredentials.value.accessToken
      } else {
        resetUserCredentials()
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  axiosPrivate.interceptors.response.use(
    (res) => res,
    async (err) => {
      // const {userCredentials, resetUserCredentials} = useUserCredentials()
      const queryClient = useQueryClient()

      const originalConfig = err.config
      if (err.response) {
        if (
          (err.response.status === 403 || err.response.status === 401) &&
          !originalConfig._retry &&
          userCredentials.value.isAuthenticated && userCredentials.value.refreshToken.length
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
              isAuthenticated: true
            }

            // eslint-disable-next-line dot-notation
            axiosPrivate.defaults.headers.common['Authorization'] = accessToken

            return axiosPrivate(originalConfig)
          } catch (_error: any) {
            if (_error.response && _error.response.data) {
              resetUserCredentials()

              queryClient.removeQueries({
                queryKey: ['user'],
              })
              navigateTo('/login')
              return Promise.reject(_error.response.data)
            }

            resetUserCredentials()
            queryClient.removeQueries({
              queryKey: ['user'],
            })
            navigateTo('/login')
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
