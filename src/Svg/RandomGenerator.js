import { Vector } from "../Lib/Math";

export default class RandomGenerator {
    generateBorder(x,y, width, height,  minAmplitude, maxAmplitude, verges){
        let path = document.createElementNS('http://www.w3.org/2000/svg',"path");  
        let svg = document.createElementNS('http://www.w3.org/2000/svg',"svg");
        
        let basePoint = new Vector(x,y);
        let a = width/2;
        let b = height/2;
        
        let PI2 = 2*Math.PI;
        let PIHalf = Math.PI/2;
        let step = PI2/verges;

        let first = true;
        let aPoint = new Vector( Math.cos(0)*a, Math.sin(0)*b);
        let bPoint = new Vector();
        let pathText = "M"+(a+basePoint.x)+ " " + (basePoint.y)+ " ";
        let lastLeftBezieDot;
        for(let alpha = step; alpha <= PI2; alpha += step) {
            let mode = "S";
            if(first){
                first = false;
                mode = "C";
            } else {
                aPoint = bPoint.clone();
            }
               
            bPoint.x = Math.cos(alpha)*a;
            bPoint.y = Math.sin(alpha)*b;
            console.log(alpha, bPoint);

            let randomLeft = this.getRandom(minAmplitude, maxAmplitude);
            let randomRight = this.getRandom(minAmplitude, maxAmplitude);
            let half = bPoint.clone().sub(aPoint).div(2);
            let rightBezieCenterDot = aPoint.clone().add(half).sub(half.clone().mul(randomLeft));
            let leftBezieDot;
            if(!lastLeftBezieDot){
                let leftBezieCenterDot = aPoint.clone().add(half).add(half.clone().mul(randomLeft));
                leftBezieDot = aPoint.clone().add(half).rotate(leftBezieCenterDot, PIHalf);
            } else {
                leftBezieDot = lastLeftBezieDot.clone();
                lastLeftBezieDot = rightBezieDot.clone();
            }
            let rightBezieDot = aPoint.clone().add(half).rotate(rightBezieCenterDot, -PIHalf);
            console.log(randomLeft, randomRight);

            if(mode === "C"){
                pathText = pathText + " C" + (leftBezieDot.x+basePoint.x) +" "+(leftBezieDot.y + basePoint.y) +" ,"+ (rightBezieDot.x + basePoint.x) +" "+(rightBezieDot.y + basePoint.y) +" ," + (bPoint.x + basePoint.x) + " " + (bPoint.y + basePoint.y)
            } else {
                pathText = pathText + " S" + (rightBezieDot.x + basePoint.x) +" "+(rightBezieDot.y + basePoint.y) +" ," + (bPoint.x + basePoint.x) + " " + (bPoint.y + basePoint.y)
            }
        }
        // path.setAttribute("d", pathText)
        return pathText + " Z";
    }

    getRandom(minAmplitude, maxAmplitude){
        return Math.random()*(maxAmplitude - minAmplitude) + minAmplitude;
    }
};