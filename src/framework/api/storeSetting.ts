import apis from '@/framework/config/api-config'
import ApiRoot from "./fetcher"


export const getStoreSettings = async () => {
    try {
        let res = await ApiRoot({url:apis?.storeSetting}).stores().getStoreSettings()
        return res
    } catch (e) {
        console.log(e)
        return []
    }
}

export const getStoreSetting = async (code: string) => {
    try {
        let res = await ApiRoot({url:apis?.storeSetting}).stores().getStoreSetting({ code })
        return res
    } catch (e) {
        console.log(e)
        return null
    }
}

export const updateStoreSetting = async (params: any) => {
    try {
        console.log('params', params)
        let res = await ApiRoot({url:apis?.storeSetting}).stores().updateStoreSetting({ body: params })
        return res
    } catch (e) {
        console.log(e)
        return false
    }
}