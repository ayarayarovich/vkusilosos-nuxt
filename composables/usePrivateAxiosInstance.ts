import type { AxiosInstance } from 'axios'

function usePrivateAxiosInstance() {
  const axiosPrivate = useNuxtApp().$axiosPrivate as AxiosInstance
  return axiosPrivate
}

export default usePrivateAxiosInstance
