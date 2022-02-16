<script>
    import {afterUpdate, onMount} from 'svelte';
    import BasePage from "../BasePage.svelte";
    import EditorField from "../../Svg/EditorField"
    import RandomGenerator from "../../Svg/RandomGenerator"
    import Node from "./Node.svelte";
    import {Vector} from '../../Lib/Math';
    import KeyPressHandler from "../../Lib/KeyPressHandler";

    export let editorField = new EditorField(0, 0);
    export let pageName;
    export let enable = false;
    export let map;
    export let position = {x: 0, y: 0};

    const MOVE_MODE = 'move';
    const ZOOM_MODE = 'zoom';
    const SELECT_MODE = 'select';
    const MOUSE_UP = 'up';
    const MOUSE_DOWN = 'down';
    const MOUSE_RIGHT = 'right';

    let mode = MOVE_MODE;
    let mouseMode = MOUSE_UP;

    let mouseDown = (event) => {
        mouseMode = MOUSE_DOWN;

        if(event.button === 2) {
            editorField.updateMousePosition(event.offsetX, event.offsetY);
            editorField.freezeMousePosition();
            editorField = editorField;
        }

        if(selectedNode) {
            mousePoint = editorField.mousePosition.clone().add(editorField.position).mul(editorField.zoom);

            let point = svgElement.createSVGPoint();
            point.x = mousePoint.x - selectedNode.x;
            point.y = mousePoint.y - selectedNode.y;

            if (!selectedNode.pathElement.isPointInFill(point)) {
                unselectAll(event);
            }
        }
    }

    let mouseUp = (event) => {
        mouseMode = MOUSE_UP;
        editorField.freezeZoom();
    }

    let mouseMove = (event) => {
        editorField.updateMousePosition(event.offsetX, event.offsetY);
        mousePoint = editorField.mousePosition.clone().add(editorField.position).mul(editorField.zoom);
        if (mouseMode === MOUSE_DOWN) {
            switch (mode) {
                case MOVE_MODE:
                    editorField.movePositionByMousePosition();
                    editorField = editorField;
                    break;
                case ZOOM_MODE:
                    editorField.updateZoomByMousePosition();
                    editorField = editorField;
                    break;
                case SELECT_MODE:
                    if(selectedNode){


                        let diff = editorField.mousePosition.clone().sub(editorField.lastMousePosition);
                        selectedNode.x += diff.x;
                        selectedNode.y += diff.y;
                    }
                    map = map
                    break;
                default:
                    break;
            }
        }
    }

    export let svgElement;

    let onWindowResize = () => {
        map = map;
        map.nodes.forEach((node) => {
            if(node.textElement) {
                let bBox = node.textElement.getBBox();
                node.borderPath = pathGenerator.generateBorder(bBox.width*1.2, bBox.height*2, -0.2, 0.4, 21);
            }
        });
        if (svgElement) {
            editorField.updateViewBox(svgElement.parentNode.offsetWidth, svgElement.parentNode.offsetHeight);
            editorField = editorField;
        }
    }

    window.onresize = onWindowResize;
    let modeToggle = (ev) => {
        ev.preventDefault();

        if (mode === MOVE_MODE) {
            mode = ZOOM_MODE;
        } else {
            mode = MOVE_MODE;
        }
    }

    let unselectAll = (event) => {
        if(selectedNode){
            selectedNode.selected = false;
            selectedNode = null;
        }

        map = map;
    }

    let pathGenerator = new RandomGenerator();
    let keyboardHandler = new KeyPressHandler();
    keyboardHandler.map.push({
        keys: ["Escape"],
        handler: unselectAll
    });
    onMount(()=>{
        keyboardHandler.subscribe();
    })
    let mousePoint = new Vector(0, 0);
    // let lastMousePoint = new Vector(0, 0);

    let selectedNode = null;
    let selectNode = (node) => {
        if(mode === SELECT_MODE) {
            if (selectedNode) {
                selectedNode.selected = false;
            }

            selectedNode = node;
            node.selected = true;
            map = map;
        }
    }



</script>

<BasePage bind:enable={enable} on:afterEnabled={()=>{onWindowResize(); }} bind:pageName pageNameSet="Editor">
    <buttons>
        <button on:click={()=>{ mode = ZOOM_MODE}}>Zoom</button>
        <button on:click={()=>{ mode = MOVE_MODE}}>Move</button>
        <button on:click={()=>{ mode = SELECT_MODE}}>Select</button>
    </buttons>
    <svg bind:this={svgElement}  viewBox="{editorField.getViewBoxString()}"
         on:mousedown={mouseDown} on:mouseup={mouseUp} on:mousemove={mouseMove} on:contextmenu={()=>{mouseMode = MOUSE_RIGHT}}>
        {#each map.nodes as node}
            <Node onSelect="{selectNode}" bind:node={node} bind:id={node.id} bind:x="{node.x}" bind:selected={node.selected} bind:y="{node.y}" bind:text="{node.text}" bind:borderPath="{node.borderPath}" bind:textElement={node.textElement}/>
        {/each}
<!--        <circle r="5" fill="red" cx="0" cy="0"/>-->
<!--        <circle r="5" fill="green" cx="{editorField.initPosition.x}" cy="{editorField.initPosition.y}"/>-->
    </svg>

</BasePage>

<style>
    /* svg{
        display: block;
        height: 100%;
        width: 100%;
    } */
</style>

