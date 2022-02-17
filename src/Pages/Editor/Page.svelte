<script>
    import {afterUpdate, beforeUpdate, onMount} from 'svelte';
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

    const MOVE_MODE = 'move';
    const ZOOM_MODE = 'zoom';
    const SELECT_MODE = 'select';
    const MOUSE_UP = 'up';
    const MOUSE_DOWN = 'down';
    const MOUSE_RIGHT = 'right';

    let mode = MOVE_MODE;
    let mouseMode = MOUSE_UP;

    beforeUpdate(()=> {
        map.nodes.forEach((node)=> {
            if(node.textElement && node.needRegen){
                let bBox = node.textElement.getBBox();
                node.borderPath = pathGenerator.generateBorder(bBox.width * 1.2, bBox.height * 1.7, -0.2, 0.4, 21);
                node.needRegen = false;
            }
            if(!node.parent && node.parentId){
                node.parent = map.nodes.find((parent) => parent.id === node.parentId);
            }
        })

        // map = map;
    })
    let mouseDown = (event) => {
        mouseMode = MOUSE_DOWN;

        if (event.button === 2) {
            editorField.updateMousePosition(event.offsetX, event.offsetY);
            editorField.freezeMousePosition();
            editorField = editorField;
        }

        if (selectedNode) {
            mousePoint = editorField.mousePosition.clone().add(editorField.position).mul(editorField.zoom);

            let point = svgElement.createSVGPoint();
            point.x = mousePoint.x - selectedNode.x;
            point.y = mousePoint.y - selectedNode.y - selectedNode.height / 2;

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
                    if (selectedNode) {
                        let diff = editorField.mousePosition.clone().sub(editorField.lastMousePosition);
                        selectedNode.x += diff.x;
                        selectedNode.y += diff.y;
                    }

                    let moveDiff = 50;
                    let moveStep = moveDiff / 10;
                    if (mousePoint.x <= editorField.position.x + moveDiff) {
                        editorField.position.x -= moveStep;
                        if (selectedNode) {
                            selectedNode.x -= moveStep;
                        }
                    }
                    if (mousePoint.x >= editorField.position.x + editorField.viewBox.x - moveDiff) {
                        editorField.position.x += moveStep;
                        if (selectedNode) {
                            selectedNode.x += moveStep;
                        }
                    }
                    if (mousePoint.y <= editorField.position.y + moveDiff) {
                        editorField.position.y -= moveStep;
                        if (selectedNode) {
                            selectedNode.y -= moveStep;
                        }
                    }
                    if (mousePoint.y >= editorField.position.y + editorField.viewBox.y - moveDiff) {
                        editorField.position.y += moveStep;
                        if (selectedNode) {
                            selectedNode.y += moveStep;
                        }
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

        if (svgElement) {
            editorField.updateViewBox(svgElement.parentNode.offsetWidth, svgElement.parentNode.offsetHeight);
            editorField = editorField;
        }
    }

    window.onresize = onWindowResize;
    // let modeToggle = (ev) => {
    //     ev.preventDefault();
    //
    //     if (mode === MOVE_MODE) {
    //         mode = ZOOM_MODE;
    //     } else {
    //         mode = MOVE_MODE;
    //     }
    // }

    let unselectAll = (event) => {
        if (selectedNode) {
            selectedNode.selected = false;
            selectedNode = null;
        }

        map = map;
    }

    let addNewNode = (event) => {
        if(selectedNode) {
            // nodes = map.nodes;
            map.nodes.sort((nodeA, nodeB) => {
                return nodeA.id < nodeB.id ? -1 : 1;
            })

            let lastElement =  map.nodes[ map.nodes.length -1];
            console.log(selectedNode)

            let newNode = EditorField.generateNode(selectedNode.x, selectedNode.y+selectedNode.height*1.7+20, lastElement.id + 1);
            newNode.parentId = selectedNode.id;
            map.nodes.push(newNode);

            map = map;
        }

    }

    let pathGenerator = new RandomGenerator();
    let keyboardHandler = new KeyPressHandler();
    keyboardHandler.map.push(
        {
            keys: ["Escape"],
            handler: unselectAll
        },
        {
            keys: ['Equal', 'ShiftLeft'],
            handler: addNewNode
        },
        {
            keys: ['Equal', 'ShiftRight'],
            handler: addNewNode
        });
    onMount(() => {
        keyboardHandler.subscribe();
    })
    let mousePoint = new Vector(0, 0);
    // let lastMousePoint = new Vector(0, 0);

    let selectedNode = null;
    let selectNode = (node) => {
        if (mode === SELECT_MODE) {
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
    <svg bind:this={svgElement} viewBox="{editorField.getViewBoxString()}"
         on:mousedown={mouseDown} on:mouseup={mouseUp} on:mousemove={mouseMove}
         on:contextmenu={()=>{mouseMode = MOUSE_RIGHT}}>
<!--        <circle r="5" fill="red" cx="{mousePoint.x}" cy="{mousePoint.y}"/>-->
        {#each map.nodes as node}
            <Node onSelect="{selectNode}" bind:node={node} bind:id={node.id} bind:x="{node.x}" bind:width={node.width}
                  bind:height={node.height} bind:selected={node.selected} bind:y="{node.y}" bind:text="{node.text}"
                  bind:borderPath="{node.borderPath}" bind:textElement={node.textElement}/>
        {/each}
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

