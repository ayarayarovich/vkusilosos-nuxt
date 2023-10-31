import type { AxiosInstance } from 'axios'

function usePrivateAxios<DataT = any>(key: string, fetcherFactory: (axios: AxiosInstance) => Promise<DataT>) {
  const axiosPrivate = useNuxtApp().$axiosPrivate as AxiosInstance
  return useAsyncData(key, () => fetcherFactory(axiosPrivate), {
    server: false,
  })
}

export default usePrivateAxios
