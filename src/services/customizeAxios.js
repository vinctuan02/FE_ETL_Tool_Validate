import axios from "axios";

const instance = axios.create({
    baseURL: 'http://10.10.12.93:3001/'
})

instance.interceptors.response.use(function (response) {
    return response.data
}, function (error) {
    return Promise.reject(error)
})

export default instance