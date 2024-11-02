import axios from 'axios';

class Sevice {
    $http;
    constructor() {
        this.$http = axios.create({
            baseURL: 'http://10.202.192.29:8080/api',
        });
        this.$http.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                console.log('err' + error);
                return Promise.reject(error);
            },
        );
        this.$http.interceptors.request.use(
            (config) => {
                return config;
            },
            (error) => {
                console.log('err' + error);
                return Promise.reject(error);
            },
        );
    }
    getExercises() {
        return this.$http.get(`/exercises`);
    }
}
const service = new Sevice();

export  {
    service
}