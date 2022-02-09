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
    rotate(center, angle){
        let sin = Math.sin(angle)
        let cos = Math.cos(angle)

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
}