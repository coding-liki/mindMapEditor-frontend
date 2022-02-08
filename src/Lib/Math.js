export class Vector {
    x = 0;
    y = 0;
    constructor(x = 0,y = 0){
        this.x = x;
        this.y = y;
    }

    length(){
        return Math.sqrt(this.x*this.x+this.y*this.y);
    }

    add(b) {
        this.x += b.x;
        this.y += b.y;
    
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

    clone() {
        return new Vector(this.x, this.y);
    }
}