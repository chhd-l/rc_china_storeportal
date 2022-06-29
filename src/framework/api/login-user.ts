import ApiRoot from './fetcher'
import apis from '../config/api-config'

export const register = async ({ username, password, phone, stores }: { username: string, password: string, phone: string, stores: any }) => {
  try {
    const { userCreate } = await ApiRoot({ url: apis?.auth }).users().register({ username, password, phone, stores })
    console.log(userCreate.id)
    await ApiRoot({ url: apis?.auth }).users().sendMessage({ userId: userCreate.id })
    return userCreate.id
  } catch (e) {
    console.log(e)
    return false
  }
}

export const verifyMesssage = async ({ userId, code }: { userId: string, code: string }) => {
  try {
    const data = await ApiRoot({ url: apis?.auth }).users().verifyMessage({ userId, code })
    return data?.verifyMessage ?? false
  } catch (e) {
    return false
  }
}

export const login = async ({ username, password }: { username: string, password: string }) => {
  try {
    const { user: userInfo, access_token } = await ApiRoot({ isShowError: false, url: apis?.auth }).users().login({ username, password })
    return {
      userInfo,
      access_token
    }
  } catch (e) {
    console.log(e)
    return false
  }
}

export const swithStore = async (storeId: string) => {
  try {
    const { user, access_token } = await ApiRoot({ url: apis?.auth }).users().swithStore(storeId)
    return {
      user,
      access_token
    }
  } catch (e) {
    return false
  }
}