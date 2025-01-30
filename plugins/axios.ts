import axios, { type AxiosInstance } from 'axios'

export default defineNuxtPlugin(() => {
    const runtimeConfig = useRuntimeConfig()

    const axiosInstance: AxiosInstance = axios.create({
        baseURL: runtimeConfig.public.apiBaseUrl,
    })

    axiosInstance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token')
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        },
        (error) => Promise.reject(error)
    )

    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            // if (error.response?.status === 401) {
            //     localStorage.removeItem('token')
            //     navigateTo('/admin/login')
            // }

            return Promise.reject(error)
        }
    )

    return {
        provide: { axios: axiosInstance },
    }
})
