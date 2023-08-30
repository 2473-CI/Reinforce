import { defineStore } from 'pinia'
import {ref} from 'vue'

export const useUserStore = defineStore('user', () => {
    const profile = ref()

    const setProfile = (val: any) => profile.value = val

    const clearProfile = () => profile.value = undefined

    return {
        profile,
        setProfile,
        clearProfile
    }

},
{
    persist: {
        storage: {
            getItem(key: any) {
                return uni.getStorageSync(key);
            },
            setItem(key: any, value: any){
                uni.setStorageSync(key, value)
            }
        }
    }
})