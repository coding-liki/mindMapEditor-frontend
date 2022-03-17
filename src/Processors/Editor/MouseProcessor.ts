import {Vector} from "../../Lib/Math";
import {StateProcessor} from "./StateProcessor";

export class MouseProcessor {
    mousePosition: Vector = new Vector();
    lastMousePosition: Vector = new Vector();

    mouseEvent?: MouseEvent = null;
    lastMouseEvent?: MouseEvent = null;

    static readonly MOUSE_STATE_DOWN: string = 'down';
    static readonly MOUSE_STATE_UP: string = 'up';

    static readonly MOUSE_MODE_MOVE: string = 'move';

    mouseState: string = MouseProcessor.MOUSE_STATE_UP;
    mouseMode: string = MouseProcessor.MOUSE_MODE_MOVE;

    stateProcessor: StateProcessor;

    constructor(stateProcessor: StateProcessor) {
        this.stateProcessor = stateProcessor;
    }

    init() {

    }


    mouseMove(event) {
        this.lastMouseEvent = this.mouseEvent;
        this.mouseEvent = event;


        if (this.mouseState === MouseProcessor.MOUSE_STATE_DOWN) {
            this.processMouseMove();
        }
    }

    processMouseMove() {
        switch (this.mouseMode) {
            case MouseProcessor.MOUSE_MODE_MOVE:
                this.stateProcessor.camera.move(
                    new Vector(
                        this.lastMouseEvent.clientX - this.mouseEvent.clientX,
                        this.lastMouseEvent.clientY - this.mouseEvent.clientY
                    )
                );
                // this.stateProcessor.viewPort = this.stateProcessor.camera.getViewPort();

                break;
        }
    }

    zoom(event: WheelEvent) {
        let delta = event.deltaY * (-0.0015);
        this.stateProcessor.camera.zoom(this.mousePosition, delta);
        this.stateProcessor.viewPort = this.stateProcessor.camera.getViewPort()

        this.updateMousePosition()
    }

    updateMousePosition() {
        this.lastMousePosition = this.mousePosition.clone();
        if (this.lastMouseEvent && this.stateProcessor.svgNode) {
            let computedStyle = getComputedStyle(this.stateProcessor.svgNode);

            let editorRect = this.stateProcessor.svgNode.getBoundingClientRect();
            let widthRatio = this.stateProcessor.camera.initViewPort.dimensions.x / this.stateProcessor.viewPort.dimensions.x;
            let heightRatio = this.stateProcessor.camera.initViewPort.dimensions.y / this.stateProcessor.viewPort.dimensions.y;

            this.mousePosition = new Vector(
                this.lastMouseEvent.clientX - editorRect.left - parseFloat(computedStyle.borderLeftWidth),
                this.lastMouseEvent.clientY - editorRect.top - parseFloat(computedStyle.borderTopWidth)
            );
            this.mousePosition.x /= widthRatio;
            this.mousePosition.y /= heightRatio;

            this.mousePosition.add(this.stateProcessor.viewPort.position);
        }
    }
}