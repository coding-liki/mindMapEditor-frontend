export default class KeyPressHandler{
    map = {};
    keyStates = {};

    processDownEvent = (event) => {
        this.keyStates[event.code] = true;
        console.log(this.keyStates);
    }

    processUpEvent = (event) =>
    {
        console.log(event.target);
        this.processPress(event.code);
        this.keyStates[event.code] = false;
    }

    subscribe(element) {

        document.addEventListener("keydown", this.processDownEvent)

        document.addEventListener("keyup", this.processUpEvent)

    }

    processPress(code) {

    }
}