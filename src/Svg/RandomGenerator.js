import { Vector } from "../Lib/Math";

export default class RandomGenerator {
    minAmplitude = 0;
    maxAmplitude = 1;
    static vergesCount = 15;

    PIHalf = Math.PI/2;

    generateBorder( width, height,  minAmplitude, maxAmplitude, verges = RandomGenerator.vergesCount){
        this.minAmplitude = minAmplitude;
        this.maxAmplitude = maxAmplitude;
        
        let a = width/2;
        let b = height/2;
        
        let PI2 = 2*Math.PI;
        let step = PI2/verges;

        let first = true;
        let aPoint = new Vector( Vector.cos(0)*a, Vector.sin(0)*b);
        let bPoint = new Vector(Vector.cos(step)*a, Vector.sin(step)*b);

        let aBezier = this.generateBezierDot(aPoint, bPoint, "left");
        let bBezier = this.generateBezierDot(aPoint, bPoint, "right");

        let firstBezier = aBezier.clone();
        let firstDot = aPoint.clone();

        let pathText = "M"+a+ " 0 ";
    
        for(let alpha = step; alpha < PI2-0.01; alpha += step) {
            let mode = first ? "C" : "S";
            first ? first = false : aPoint = bPoint.clone();


            bPoint = new Vector(Vector.cos(alpha)*a, Vector.sin(alpha)*b);

            bBezier = this.generateBezierDot(aPoint, bPoint, "right");

            if(mode === "C"){
                pathText = pathText + this.generateCPart(aBezier, bBezier, bPoint);
            } else {
                pathText = pathText + this.generateSPart(bBezier, bPoint);
            }
            aBezier = bBezier.clone();
        }

        return pathText + this.generateSPart(firstBezier.rotate(firstDot, Math.PI), firstDot);
    }

    getRandom(minAmplitude, maxAmplitude){
        return Math.random()*(maxAmplitude - minAmplitude) + minAmplitude;
    }

    generateBezierDot(a, b, type){
        let random = this.getRandom(this.minAmplitude, this.maxAmplitude);
        let half = b.clone().sub(a).div(2);

        if(type === 'left') {
            return  a.clone().add(half).rotate(a.clone().add(half).add(half.clone().mul(random)), this.PIHalf);
        } else {
            return a.clone().add(half).rotate(a.clone().add(half).sub(half.clone().mul(random)), -this.PIHalf);
        }
    }

    generateCPart(aBezier, bBezier, b) {
        return " C" + aBezier.x +" "+ aBezier.y +" ,"+ bBezier.x +" "+bBezier.y +" ," + b.x + " " + b.y;
    }

    generateSPart(bBezier, b) {
        return " S" + bBezier.x +" "+bBezier.y +" ," + b.x + " " + b.y;
    }
};