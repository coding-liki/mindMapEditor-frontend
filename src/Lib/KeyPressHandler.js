export default class KeyPressHandler{
    map = [];
    keyStates = {};

    subscribed = false;
    processDownEvent = (event) => {
        this.keyStates[event.code] = true;
    }

    processUpEvent = (event) =>
    {
        this.processPress(event);
        this.keyStates[event.code] = false;
    }

    subscribe() {
        if(!this.subscribed) {
            document.addEventListener("keydown", this.processDownEvent)

            document.addEventListener("keyup", this.processUpEvent)
        }

    }

    processPress(event) {
        let keysUp = Object.keys(this.keyStates).filter((state) => this.keyStates[state]).sort();
        let handlers = this.map.filter((handler) => handler.keys.sort().toString() === keysUp.toString() );

        handlers.forEach((handler) => {
            handler.handler(event);
        })
    }
}