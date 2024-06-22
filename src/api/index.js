import axios from "axios"
import {APP_BASEURL} from "@env"
console.log(APP_BASEURL)
 const axiosInstance = axios.create({
     baseURL:"http://192.168.64.5:5000",
    //baseURL:APP_BASEURL,
    headers:{
        "Content-Type":"application/json"
    }
})

export default axiosInstance