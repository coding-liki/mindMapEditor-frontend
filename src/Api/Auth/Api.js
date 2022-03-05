import BaseApiClass from "../BaseApiClass.js";
export let endpoint = "http://server.vinilla-mind-map.ru";

class AuthApi extends BaseApiClass{
    constructor(endpoint){
        super(endpoint, 'auth');
    }

    async register(login, password, name){
        return await this.post('register', {
            login: login,
            password: password,
            name: name
        })
    }

    async login(login, password){
        return await this.post('login', {
            login: login,
            password: password,
        })
    }

    async check(){
        return await this.post('check', {
        })
    }

}

export const api = new AuthApi(endpoint);
