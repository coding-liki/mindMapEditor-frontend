import { Vector } from "../Lib/Math";

export default class RandomGenerator {
    minAmplitude = 0;
    maxAmplitude = 1;
    generateBorder( width, height,  minAmplitude, maxAmplitude, verges){
        this.minAmplitude = minAmplitude;
        this.maxAmplitude = maxAmplitude;

        let path = document.createElementNS('http://www.w3.org/2000/svg',"path");  
        let svg = document.createElementNS('http://www.w3.org/2000/svg',"svg");
        
        let a = width/2;
        let b = height/2;
        
        let PI2 = 2*Math.PI;
        let step = PI2/verges;

        let first = true;
        let aPoint = new Vector( Math.cos(0)*a, Math.sin(0)*b);
        let bPoint = new Vector(Math.cos(step)*a, Math.sin(step)*b);

        let leftBezieDot = this.generateBizieDot(aPoint, bPoint, "left");
        let rightBezieDot = this.generateBizieDot(aPoint, bPoint, "right");

        let pathText = "M"+a+ " 0 ";
    
        for(let alpha = step; alpha <= PI2; alpha += step) {
            let mode = first ? "C" : "S";
            first ? first = false : aPoint = bPoint.clone();
            
            bPoint = new Vector(Math.cos(alpha)*a, Math.sin(alpha)*b);

            rightBezieDot = this.generateBizieDot(aPoint, bPoint, "right");

            if(mode === "C"){
                pathText = pathText + " C" + leftBezieDot.x +" "+ leftBezieDot.y +" ,"+ rightBezieDot.x +" "+rightBezieDot.y +" ," + bPoint.x + " " + bPoint.y;
            } else {
                pathText = pathText + " S" + rightBezieDot.x +" "+ rightBezieDot.y +" ," + bPoint.x + " " + bPoint.y;
            }
            leftBezieDot = rightBezieDot.clone();
        }

        return pathText + " Z";
    }

    getRandom(minAmplitude, maxAmplitude){
        return Math.random()*(maxAmplitude - minAmplitude) + minAmplitude;
    }

    generateBizieDot(a, b, type){
        let PIHalf = Math.PI/2;

        let random = this.getRandom(this.minAmplitude, this.maxAmplitude);
        let half = b.clone().sub(a).div(2);

        if(type === 'left') {
            return  a.clone().add(half).rotate(a.clone().add(half).add(half.clone().mul(random)), PIHalf);
        } else {
            return a.clone().add(half).rotate(a.clone().add(half).sub(half.clone().mul(random)), -PIHalf);
        }
    }
};