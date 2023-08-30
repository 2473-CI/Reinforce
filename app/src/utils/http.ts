import { useUserStore } from "@/stores"

const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

const httpInterceptor = {
    invoke(options: UniApp.RequestOptions){
        if(!options.url.startsWith('http')) {
            options.url = baseURL + options.url
        }
        options.timeout = 10000

        options.header = {
            ... options.header,
            'source-client': 'nimiapp'
        }

        const userStore = useUserStore()
        const token = userStore.profile?.token

        if(token){
            options.header.Authorization = token
        }

    }
}

uni.addInterceptor('request', httpInterceptor)

uni.addInterceptor('uploadFile', httpInterceptor)

interface Data<T> {
    code: string,
    msg: string,
    result: T
}

export const http = <T>(options: UniApp.RequestOptions) => {
    return new Promise<Data<T>>((resolve, reject) => {
        uni.request({ 
            ... options,
            success(res) {
                if(res.statusCode < 300 && res.statusCode >= 200 ){
                    resolve(res.data as Data<T>);
                }else if(res.statusCode == 401){
                    const userStore = useUserStore()
                    userStore.clearProfile()
                    uni.navigateTo({url: "/login"})
                    reject(res)
                }else{
                    uni.showToast({
                        icon: 'none',
                        title: (res.data as Data<T>).msg || "请求错误"
                    })
                }
            },
            fail(err) {
                uni.showToast({
                    icon: 'none',
                    title: "网络错误"
                })
                reject(err)
            }
         })
    })
}