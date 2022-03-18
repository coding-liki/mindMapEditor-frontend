import type {KeyPressHandler} from "../../../Lib/KeyPressHandler";
import type {NodeView} from "../../../Lib/Views/NodeView";

export class MouseProcessor{
    keyPressHandler: KeyPressHandler;
    nodeView: NodeView;

    constructor(keyPressHandler: KeyPressHandler, nodeView: NodeView) {
        this.keyPressHandler = keyPressHandler;
        this.nodeView = nodeView;
    }

    mouseDown(event){

    }
}