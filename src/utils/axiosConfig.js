import axios from "axios";
import LocalStorageService from "./services/storage/localstorageservice";
// import router from "./router/router";

// LocalstorageService
const localStorageService = LocalStorageService.getService();

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    console.log('Axios Interceptors');
    const token = localStorageService.getAuthToken();
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//Add a response interceptor

axios.interceptors.response.use((response) => {
    return response
}, function (error) {
    const originalRequest = error.config;

    if (error.response.status === 401 && originalRequest.url ===
        'https://dev.hashdish.com/v1.0/kitchen/refresh) {
    //    router.push('/login'); 
    // <Redirect to="/login" />
    return Promise.reject(error);
}

   if (error.response.status === 401 && !originalRequest._retry) {

    originalRequest._retry = true;
    const refreshToken = localStorageService.getRefreshToken();
    return axios.post('https://dev.hashdish.com/v1.0/kitchen/refresh',
        {
            "refreshToken": refreshToken
        })
        .then(res => {
            if (res.status === 201) {
                localStorageService.setToken(res.data);
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAuthToken();
                return axios(originalRequest);
            }
        })
}
return Promise.reject(error);
});