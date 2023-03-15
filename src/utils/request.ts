import axios from "axios";

const requests = axios.create({
    timeout: 100000
})

requests.interceptors.request.use(req => {
    console.log(req.data, req.url)
    return req
}, err => {
    return Promise.reject(err)
})

requests.interceptors.response.use(req => {
    console.log(req.data, req.status)
    return req
}, err => {
    return Promise.reject(err)
})


export default requests


