import type { AxiosInstance } from 'axios'
import type { AsyncDataOptions } from 'nuxt/app'

function usePublicAxios<DataT = any>(
  key: string,
  fetcherFactory: (axios: AxiosInstance) => Promise<DataT>,
  options?: AsyncDataOptions<DataT>
) {
  const axiosPublic = useNuxtApp().$axiosPublic as AxiosInstance
  return useAsyncData(key, () => fetcherFactory(axiosPublic), options)
}

export default usePublicAxios
