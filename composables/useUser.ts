import { useQuery } from '@tanstack/vue-query'
import type { User } from '~/interfaces/users'
import { useUserStore } from '~/store/user'

type GetResponse = User

export const useUser = <SData>(select: (response: GetResponse) => SData) => {
  const privateAxios = usePrivateAxiosInstance()
  const userStore = useUserStore()

  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await privateAxios.get<GetResponse>('user/me')
      return response.data
    },
    select,
    enabled: userStore.isAuthenticated,
  })
}
