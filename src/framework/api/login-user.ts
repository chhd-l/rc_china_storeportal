import ApiRoot from './fetcher'

export const register = async ({ username, password, phone }: { username: string, password: string, phone: string }) => {
  try {
    const { createUser } = await ApiRoot.users().register({ username, password, phone })
    console.log(createUser.id)
    await ApiRoot.users().sendMessage({ userId: createUser.id })
    return createUser.id
  } catch (e) {
    console.log(e)
    return false
  }
}

export const verifyMesssage = async ({ userId, code }: { userId: string, code: string }) => {
  try {
    await ApiRoot.users().verifyMessage({ userId, code })
    return true
  } catch (e) {
    return false
  }
}

export const login = async ({ username, password }: { username: string, password: string }) => {
  try {
    const { userInfo } = await ApiRoot.users().login({ username, password })
    return {
      userInfo
    }
  } catch (e) {
    console.log(e)
    return false
  }
}