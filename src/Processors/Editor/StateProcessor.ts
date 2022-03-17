import {Camera} from "../../Lib/Svg/Editor/Camera";
import {ViewPort} from "../../Lib/Svg/Editor/ViewPort";
import {Vector} from "../../Lib/Math";
import {NodeView} from "../../Lib/Views/NodeView";
import {EventDispatcher} from "../../Lib/EventDispatcher";
import {NODE, PAGE} from "../../Lib/Constants/EventDispatcherNames";
import {NODE_START_EDIT, NodeStartEdit, PAGE_ENABLED_AFTER, PageEnabledAfter} from "../../Lib/Constants/Events";

export class StateProcessor {
    camera?: Camera = null;
    svgNode?: Element = null;
    viewPort?: ViewPort = null;

    editedNodeView?: NodeView = null;

    pageDispatcher: EventDispatcher = EventDispatcher.instance(PAGE);
    nodeDispatcher: EventDispatcher = EventDispatcher.instance(NODE);

    init() {
        this.camera = new Camera(new Vector(0, 0, -1), new ViewPort(new Vector(0, 0), new Vector(0, 0)))

        // console.log(camera)
        this.pageDispatcher.subscribe(PAGE_ENABLED_AFTER, (event: PageEnabledAfter) => {
            if (event.pageName === "editor") {
                this.onWindowResize();
            }
        })

        this.nodeDispatcher.subscribe(NODE_START_EDIT, (event: NodeStartEdit) => {
            console.log('start edit', event.nodeView);
            if (this.editedNodeView && this.editedNodeView === event.nodeView) {
                this.editedNodeView = null;
            } else {
                this.editedNodeView = event.nodeView;
            }
            
        })


        this.onWindowResize();
        window.onresize = this.onWindowResize;
    }

    onWindowResize() {
        if (this.svgNode) {
            let computedStyle = getComputedStyle(document.body);

            let editorRect = this.svgNode.parentNode.getBoundingClientRect();
            let width = document.body.offsetWidth - editorRect.left - parseFloat(computedStyle.paddingTop) - parseFloat(computedStyle.paddingBottom);
            let height = document.body.offsetHeight - editorRect.top - parseFloat(computedStyle.paddingLeft) - parseFloat(computedStyle.paddingRight);

            let newPosition = this.camera.position.clone().subXY(width / 2, height / 2);
            newPosition.z = 0;
            let newDimensions = new Vector(width, height);
            this.camera = new Camera(this.camera.position.clone(), new ViewPort(newPosition, newDimensions));
        }
    }

    beforeUpdate(){
        if (this.camera) {
            this.viewPort = this.camera.getViewPort();
        }
    }
}