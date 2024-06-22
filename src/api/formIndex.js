import axios from "axios"
import {APP_BASEURL} from "@env"
const axiosInstance = axios.create({
   baseURL:"http://192.168.64.5:5000",
    //baseURL:APP_BASEURL,
    headers:{
        "Content-Type": "multipart/form-data",
    }
})

export default axiosInstance
