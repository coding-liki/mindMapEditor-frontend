import type {Node} from "./Node";

export class Link {
    nodeFrom: Node;
    nodeTo: Node;
    type: LinkType
}

export enum LinkType { first, second, third, fourth };