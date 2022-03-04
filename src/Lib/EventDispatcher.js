export default class EventDispatcher {
    eventListeners = {};
    static dispatcher = null;

    subscribe(name, handler){
        if(!this.eventListeners[name]){
            this.eventListeners[name] = []
        }
        if(!this.eventListeners[name].includes(handler)) {
            this.eventListeners[name].push(handler);
        }
    }

    dispatch(name, data){
        if(this.eventListeners[name]){
            this.eventListeners[name].forEach((handler) => {
                handler(data);
            })
        }
    }


    static instance(){
        if(!this.dispatcher){
            this.dispatcher = new EventDispatcher();
        }

        return this.dispatcher;
    }
}