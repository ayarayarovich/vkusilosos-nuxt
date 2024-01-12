export default defineEventHandler((event) => {
  const query = getQuery<{
    token: string
    refresh: string
  }>(event)

  const credentials = { accessToken: query.token, refreshToken: query.refresh, isAuthenticated: true }

  setCookie(
    event,
    'user_credentials',
    JSON.stringify(credentials),
    {
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    }
  )

  return sendRedirect(event, '/', 302)
})
