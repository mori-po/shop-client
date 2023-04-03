import { ShopResponse } from '~~/types/shop'

export const useUser = () => {
  const user = useState<ShopResponse | null>('user', () => null)
  const config = useRuntimeConfig()

  async function getUser () {
    if (user?.value !== null) { return user }
    const { checkAuthState, token } = useAuth()
    await checkAuthState()
    if (token) {
      const { data } = await useFetch<ShopResponse>(config.API_ENDPOINT + '/shop', {
        headers: {
          authorization: `${token.value}`
        },
        watch: [token]
      })
      user.value = data.value
    }
    return user
  }

  return {
    getUser,
    user
  }
}
