import {Link} from "../Models/Link";
import type {Node} from "../Models/Node";

export class NodeView {
    node: Node;
    link?: Link;

    updateLink(): NodeView {
        this.link = new Link();

        this.link.nodeTo = this.node;
        this.link.nodeFrom = this.node.parentNode;
        this.link.type = this.node.getLinkType();

        return this;
    }
}