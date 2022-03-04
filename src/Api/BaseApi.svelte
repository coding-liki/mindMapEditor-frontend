<script>
    import {LocalStorage} from "../Lib/LocalStorage";

    export let endpoint = '';
    export let controller = '';
    export const AUTH_TOKEN_KEY = 'auth_token'
    export let buildHeaders = () => {
        let headers = {
            'Content-Type': 'application/json;charset=utf-8'
        }

        let authToken = LocalStorage.get(AUTH_TOKEN_KEY);
        if (authToken) {
            headers.Authorization = 'Bearer ' + authToken;
        }

        return headers;
    }

    export async function request(method, params = {}, httpMethod) {
        let options = {
            method: httpMethod,
            headers: buildHeaders(),
            body: JSON.stringify(params)
        }

        let response = await fetch(endpoint + '/' + controller + '/' + method, options);
        let result = await response.json();

        if (response.ok) {
            return result;
        } else {
            throw Error(result);
        }

    }

    export async function get(method, params = {}) {
        return await request(method, params, 'GET');
    }

    export async function post(method, params = {}) {
        return await request(method, params, 'POST');
    }

    export async function put(method, params = {}) {
        return await request(method, params, 'PUT');
    }

    export async function del(method, params = {}) {
        return await request(method, params, 'DELETE');
    }
</script>