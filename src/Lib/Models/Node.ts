import {Vector} from "../Math";
import MindMap from "./MindMap";
import {LinkType} from "./Link";

export class Node {

    id: number;
    text: string;
    position: Vector;
    parentNode?: Node;
    parentLinkNode?: Node;
    toMindMap?: MindMap;

    getLinkType(): LinkType{
        let linkType: LinkType = LinkType.first;
        let parent = this.parentLinkNode;
        while(parent.id !== this.parentNode.id && linkType < 3){
            parent = parent.parentLinkNode;
            linkType++;
        }

        return linkType;
    }
}