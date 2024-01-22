export default defineEventHandler((event) => {
  const query = getQuery<{
    token: string
    refresh: string
  }>(event)

  const credentials = { accessToken: query.token, refreshToken: query.refresh, isAuthenticated: true }

  setCookie(event, 'user_credentials', JSON.stringify(credentials), {
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 30 * 24 * 60 * 60,
  })

  return sendRedirect(event, '/', 302)
})
