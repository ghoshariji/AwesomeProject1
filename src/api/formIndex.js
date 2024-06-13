import axios from "axios"

const axiosInstance = axios.create({
    baseURL:"http://192.168.57.192:5000",
    headers:{
        "Content-Type": "multipart/form-data",
    }
})

export default axiosInstance
