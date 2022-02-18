export class Vector {
    x = 0;
    y = 0;
    static sinValues = {};
    static cosValues = {};
    static acosValues = {};

    constructor(x = 0,y = 0){
        this.x = x;
        this.y = y;
    }

    length(){
        return Math.sqrt(this.x*this.x+this.y*this.y);
    }

    norm() {
        this.div(this.length());

        return this;
    }

    addXY(x,y) {
        this.x += x;
        this.y += y;

        return this;
    }

    add(b) {
        this.x += b.x;
        this.y += b.y;
    
        return this;
    }

    subXY(x,y) {
        this.x -= x;
        this.y -= y;

        return this;
    }

    sub (b) {
        this.x -= b.x;
        this.y -= b.y;

        return this;
    }

    mul (scalar) {
        this.x *= scalar;
        this.y *= scalar;
    
        return this;
    }

    div(scalar) {
        this.x /= scalar;
        this.y /= scalar;

        return this;
    }
    rotate(center, angle){
        let sin = Vector.sin(angle)
        let cos = Vector.cos(angle)

        this.sub(center);

        let newX = this.x*cos - this.y*sin;
        let newY = this.x*sin + this.y*cos;

        this.x = newX;
        this.y = newY;
        this.add(center);

        return this;
    }

    clone() {
        return new Vector(this.x, this.y);
    }

    static sin(angle){
        if(!Vector.sinValues[angle]){
            Vector.sinValues[angle] = Math.sin(angle);
            Vector.cosValues[angle] = Math.cos(angle);
        }
        return Vector.sinValues[angle];
    }

    static cos(angle){
        if(!Vector.sinValues[angle]){
            Vector.sinValues[angle] = Math.sin(angle);
            Vector.cosValues[angle] = Math.cos(angle);
        }
        return Vector.cosValues[angle];
    }

    static acos(value) {
        if(!Vector.acosValues[value]){
            Vector.acosValues[value] = Math.acos(value);
            // Vector.cosValues[angle] = Math.cos(angle);
        }
        return Vector.acosValues[value];
    }
}

