import { Vector } from "../Lib/Math";

export default class EditorField {
    zoom = 1;
    previousZoom = 1;
    position = new Vector();
    viewBox = new Vector();
    mousePosition = new Vector();
    initMousePosition = new Vector();
    lastMousePosition = new Vector();
    initPosition = new Vector();

    constructor(width, height){
        this.viewBox.x = width;
        this.viewBox.y = height;
    }

    updateViewBox(width, height){
        this.viewBox.x = width;
        this.viewBox.y = height;

        return this;
    }


    getViewBoxString(){
        let zoomedPosition = this.position.clone().mul(this.zoom);
        let zoomedViewBox  = this.viewBox.clone().mul(this.zoom);

        return zoomedPosition.x +" "+zoomedPosition.y+" "+zoomedViewBox.x+" "+zoomedViewBox.y;
    }

    updateMousePostion(x,y){
        this.lastMousePosition = this.mousePosition.clone();
        this.mousePosition.x = x;
        this.mousePosition.y = y;

        return this;
    }

    movePositionByMousePosition(){
        this.position.sub(this.mousePosition).add(this.lastMousePosition);

        return this;
    }

    freezeMousePosition(){
        this.initMousePosition = this.mousePosition.clone();
        this.initPosition = this.position.clone();
        console.log(this.initPosition);
    }

    freezeZoom() {
        this.previousZoom = this.zoom;
    }
    updateZoomByMousePosition(){
        let fullOffset = this.mousePosition.clone().sub(this.initMousePosition);
        let dist = -fullOffset.x;

        // let windowPosition = this.initMousePosition.clone().add(this.initPosition).mul(this.zoom);//.add(this.initPosition);


        if(this.zoom < 1){
            this.zoom = this.previousZoom + dist*this.zoom*0.001;
        } else {
            this.zoom = this.previousZoom +  dist/this.zoom*0.001;
        }

        if(this.zoom < 0) {
            this.zoom = 0;
        } else if(this.zoom > 100){
            this.zoom =100;
        }

        // let newWindowPosition = this.initMousePosition.clone().add(this.initPosition).mul(this.zoom);

        // this.position.add(newWindowPosition.sub(windowPosition).mul(2));
        return this;
    }
    


}