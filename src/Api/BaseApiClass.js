export default class BaseApiClass
{
    constructor(endpoint, controller) {
        this.endpoint = endpoint;
        this.controller = controller;
    }

    buildHeaders() {
        return {
            'Content-Type': 'application/json;charset=utf-8'
        };
    }

    async  request(method, params = {}, httpMethod) {
        let options = {
            method: httpMethod,
            headers: this.buildHeaders(),
            body: JSON.stringify({params:params})
        };

        let response = await fetch(this.endpoint+'/'+this.controller+'/'+method, options);
        let result = await response.json();

        if(response.ok){
            return result;
        } else {
            throw Error(result);
        }

    }

        async  get(method, params= {}){
        return await this.request(method, params, 'GET');
    }

        async  post(method, params= {}){
        return await this.request(method, params, 'POST');
    }

        async  put(method, params= {}){
        return await this.request(method, params, 'PUT');
    }

        async  del(method, params= {}){
        return await this.request(method, params, 'DELETE');
    }
}
