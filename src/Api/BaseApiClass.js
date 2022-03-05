import LocalStorage from "../Lib/LocalStorage";

export const AUTH_TOKEN_KEY = 'auth_token'

export default class BaseApiClass {
    constructor(endpoint, controller) {
        this.endpoint = endpoint;
        this.controller = controller;
    }

    buildHeaders() {
        let headers = {
            'Content-Type': 'application/json;charset=utf-8'
        }

        let authToken = LocalStorage.get(AUTH_TOKEN_KEY);
        if (authToken) {
            headers.Authorization = 'Bearer ' + authToken;
        }

        return headers;
    }

    async request(method, params = {}, httpMethod) {
        let options = {
            method: httpMethod,
            headers: this.buildHeaders(),
            body: JSON.stringify({params: params})
        };

        let response = await fetch(this.endpoint + '/' + this.controller + '/' + method, options);
        console.log(response.status);

        let result = await response.catch((error) => {
            console.log("response", error);
        }).json();

        if (response.ok) {
            return result;
        } else {
            throw Error(response, result);
        }

    }

    async get(method, params = {}) {
        return await this.request(method, params, 'GET');
    }

    async post(method, params = {}) {
        return await this.request(method, params, 'POST');
    }

    async put(method, params = {}) {
        return await this.request(method, params, 'PUT');
    }

    async del(method, params = {}) {
        return await this.request(method, params, 'DELETE');
    }
}
