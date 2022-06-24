import ApiRoot from './fetcher'

export const register = async ({ username, password, phone,stores }: { username: string, password: string, phone: string,stores:any }) => {
  try {
    const { userCreate } = await ApiRoot.users().register({ username, password, phone,stores })
    console.log(userCreate.id)
    await ApiRoot.users().sendMessage({ userId: userCreate.id })
    return userCreate.id
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
    const { userInfo, access_token } = await ApiRoot.config({ isShowError: false }).users().login({ username, password })
    return {
      userInfo,
      access_token
    }
  } catch (e) {
    console.log(e)
    return false
  }
}