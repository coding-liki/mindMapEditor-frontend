import BaseApiClass from "../BaseApiClass.js";
export let endpoint = "http://jsondbback.vinylcoding.ru";

class MindMapApi extends BaseApiClass{
    constructor(endpoint){
        super(endpoint, 'test');
    }

    async list(){
        return await this.post('get', {
            id: 1
        });
    }
}

export const api = new MindMapApi(endpoint);

