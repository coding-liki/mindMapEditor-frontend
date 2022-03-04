import BaseApiClass from "../BaseApiClass.js";

export let endpoint = "http://server.vinilla-mind-map.ru";

class MindMapApi extends BaseApiClass {
    constructor(endpoint) {
        super(endpoint, 'mind-map');
    }

    async getAll() {
        return await this.post('get-all');
    }
}

export const api = new MindMapApi(endpoint);

