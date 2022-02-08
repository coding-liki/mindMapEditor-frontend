export class Vector {
    x = 0;
    y = 0;
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    add = (b) => {
        this.x += b.x;
        this.y += b.y;
    
        return this;
    }

    sub = (b) => {
        this.x -= b.x;
        this.y -= b.y;

        return this;
    }

    mul = (scalar) => {
        this.x *= scalar;
        this.y *= scalar;
    
        return this;
    }

    div = (scalar) => {
        this.x /= scalar;
        this.y /= scalar;

        return this;
    }

    clone() {
        return new Vector(this.x, this.y);
    }
}