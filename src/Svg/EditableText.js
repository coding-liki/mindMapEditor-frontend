const SVG_NS = "http://www.w3.org/2000/svg";

export default class EditableText {
    text = "";

    getTSpans() {
        let lines = this.text.split("\n");
        let tSpans = [];
        let first = true;
        lines.forEach((line) => {
            let tSpan = document.createElementNS(SVG_NS, "tspan");
            tSpan.textContent = line;
            tSpan.setAttributeNS(null, 'x', "0");
            if(first){
                first = false;
                tSpan.setAttributeNS(null, 'y', "1em");
            } else {
                tSpan.setAttributeNS(null, 'dy', "1em");

            }
            tSpans.push(tSpan);
        })

        return tSpans;
    }
}