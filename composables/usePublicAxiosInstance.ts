import type { AxiosInstance } from 'axios'

function usePublicAxiosInstance() {
  const axiosPublic = useNuxtApp().$axiosPublic as AxiosInstance
  return axiosPublic
}

export default usePublicAxiosInstance
