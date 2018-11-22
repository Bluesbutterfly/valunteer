import store from 'store'
import expirePlugin from 'store/plugins/expire'

store.addPlugin(expirePlugin)

export {store}

export const getLogin = function () {
    const token = store.get("key")
    return token || ''
}