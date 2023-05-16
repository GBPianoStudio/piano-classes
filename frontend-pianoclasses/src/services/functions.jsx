import axios from "axios";

axios.defaults.headers.post['Content-Type']= 'application/json';
axios.defaults.headers.post['Accept']= 'application/json';
axios.defaults.withCredentials = true;

function getAxiosInstance(endpoint = "http://localhost:8000") {
    const instance = axios.create({
        withCredentials: true,
        baseURL: endpoint
    });

    instance.interceptors.request.use(function (config) {
        const token = localStorage.getItem("auth_token");
        config.headers.Authorization = token ? `Bearer ${token}` : "";
        return config;
      });

    return instance
}

export {

    getAxiosInstance

    
};
