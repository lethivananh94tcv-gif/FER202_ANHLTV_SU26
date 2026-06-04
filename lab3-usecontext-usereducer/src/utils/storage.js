const isTest = import.meta.env.MODE === 'test'

export const saveUser = (user) => {
  if (isTest) return
  localStorage.setItem('authUser', JSON.stringify(user))
}

export const getUser = () => {
  if (isTest) return null

  const data = localStorage.getItem('authUser')
  return data ? JSON.parse(data) : null
}

export const removeUser = () => {
  if (isTest) return
  localStorage.removeItem('authUser')
}