import { Vector } from "../Lib/Math";

export default class EditorField {
    zoom = 1;
    position = new Vector(0,0);
    viewBox = new Vector(0,0);

    constructor(width, height){
        this.viewBox.x = width;
        this.viewBox.y = height;
    }

    updateViewBox(width, height){
        this.viewBox.x = width;
        this.viewBox.y = height;

        return this;
    }
}