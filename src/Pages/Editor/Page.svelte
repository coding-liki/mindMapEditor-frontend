<script>
    import {afterUpdate, beforeUpdate, onMount, tick} from 'svelte';
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
    const MOUSE_UP = 'mouse_up';
    const MOUSE_DOWN = 'mouse_down';
    const MOUSE_RIGHT = 'right';
    const MOUSE_OUT = 'mouse_out';
    const MOUSE_IN = 'mouse_in';

    let mode = MOVE_MODE;
    let mouseMode = MOUSE_UP;

    let bordersInterval = null;

    function checkEditorBorders() {
        if (mode === SELECT_MODE) {
            let mousePoint = editorField.mousePosition.clone().add(editorField.position).mul(editorField.zoom);

            let moveDiff = 30;
            let moveStep = moveDiff / 10;
            if (mousePoint.x <= editorField.position.x + moveDiff) {
                editorField.position.x -= moveStep;
                if (selectedNode && mouseMode === MOUSE_DOWN && mode === SELECT_MODE) {
                    selectedNode.position.subXY( moveStep, 0);

                }
            }
            if (mousePoint.x >= editorField.position.x + editorField.viewBox.x - moveDiff) {
                editorField.position.x += moveStep;
                if (selectedNode && mouseMode === MOUSE_DOWN && mode === SELECT_MODE) {
                    selectedNode.position.addXY( moveStep, 0);
                }
            }
            if (mousePoint.y <= editorField.position.y + moveDiff) {
                editorField.position.y -= moveStep;
                if (selectedNode && mouseMode === MOUSE_DOWN && mode === SELECT_MODE) {
                    selectedNode.position.subXY( 0, moveStep);
                }
            }
            if (mousePoint.y >= editorField.position.y + editorField.viewBox.y - moveDiff) {
                editorField.position.y += moveStep;
                if (selectedNode && mouseMode === MOUSE_DOWN && mode === SELECT_MODE) {
                    selectedNode.position.addXY( 0, moveStep);
                }
            }
        }
    }

    beforeUpdate(() => {
        map.nodes.forEach((node) => {
            if (node.textElement && node.needRegen) {
                let bBox = node.textElement.getBBox();
                node.borderPath = pathGenerator.generateBorder(bBox.width * 1.2, bBox.height * 1.7, -0.2, 0.4);
                setTimeout(()=> {
                    node.totalLength = node.pathElement.getTotalLength();
                    let PI2 = 2*Math.PI;
                    let step = PI2/RandomGenerator.vergesCount;
                    let angle = 0;
                    let pathPoints = {};
                    while(angle < PI2){
                        let length = angle/PI2 * node.totalLength;
                        pathPoints[angle.toPrecision(5)] = node.pathElement.getPointAtLength(length);
                        angle += step;
                    }
                    node.pathPoints = pathPoints;
                    // let first
                    node.needRecalcLink = true;
                    if(node.parent) {
                        node.parent.totalLength = node.parent.pathElement.getTotalLength();
                        let PI2 = 2*Math.PI;
                        let step = PI2/RandomGenerator.vergesCount;
                        let angle = 0;
                        let pathPoints = {};
                        while(angle < PI2){
                            // angle.toPrecision(5);
                            let length = angle/PI2 * node.totalLength;
                            pathPoints[angle.toPrecision(5)] = node.parent.pathElement.getPointAtLength(length);
                            angle += step;
                        }
                        node.parent.pathPoints = pathPoints;
                    }
                    // map.nodes.filter((child) => node.id === child.parentId).forEach((child) => {
                    //     child.needRecalcLink = true
                    // });
                }, 10)
                node.needRegen = false;
                node.needRecalcLink = true;
                map.nodes.filter((child) => node.id === child.parentId).forEach((child) => {
                    child.needRecalcLink = true
                });
            }
            if (!node.parent && node.parentId) {
                node.parent = map.nodes.find((parent) => parent.id === node.parentId);
            }
        })
        if (!bordersInterval && mouseMode !== MOUSE_OUT) {
            // bordersInterval = setInterval(checkEditorBorders, 100);
        }
        editorField = editorField;
        map = map;
    })
    let mouseDown = (event) => {
        mouseMode = MOUSE_DOWN;

        // if (event.button === 1) {
        editorField.updateMousePosition(event.offsetX, event.offsetY);
        editorField.freezeMousePosition();
        // }

        if (selectedNode) {
            mousePoint = editorField.mousePosition.clone()
                .add(editorField.position)
                .mul(editorField.zoom)
                .sub(selectedNode.position)
                .subXY(0,selectedNode.height / 2);

            let point = svgElement.createSVGPoint();
            point.x = mousePoint.x ;
            point.y = mousePoint.y ;

            if (!selectedNode.pathElement.isPointInFill(point)) {
                unselectAll(event);
            }
        }
        editorField = editorField;
        map = map;

    }

    let mouseUp = (event) => {
        mouseMode = MOUSE_UP;
        editorField.freezeZoom();
    }

    let mouseMove = (event) => {
        editorField.updateMousePosition(event.offsetX, event.offsetY);
        // mousePoint = editorField.mousePosition.clone().add(editorField.position).mul(editorField.zoom);
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
                        let diff = editorField.mousePosition.clone().sub(editorField.lastMousePosition).mul(editorField.zoom);
                        selectedNode.position.add(diff);
                        selectedNode.needRecalcLink = true;
                        map.nodes.filter((node) => node.parentId === selectedNode.id).forEach((node) => {
                            node.needRecalcLink = true;
                        })
                        selectedNode = selectedNode;
                    }
                    editorField = editorField;

                    map = map
                    break;
                default:
                    break;
            }
        }
    }

    let svgElement;

    let onWindowResize = () => {
        map = map;

        if (svgElement) {
            editorField.updateViewBox(svgElement.parentNode.offsetWidth, svgElement.parentNode.offsetHeight);
            editorField = editorField;
        }
    }

    window.onresize = onWindowResize;

    let unselectAll = (event) => {
        if (selectedNode) {
            selectedNode.selected = false;
            selectedNode = null;
        }

        map = map;
    }

    let addNewNode = (event) => {
        if (selectedNode) {
            map.nodes.sort((nodeA, nodeB) => {
                return nodeA.id < nodeB.id ? -1 : 1;
            })

            let lastElement = map.nodes[map.nodes.length - 1];

            let newNode = EditorField.generateNode(selectedNode.position.x, selectedNode.position.y + selectedNode.height * 1.7 + 20, lastElement.id + 1);
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
         on:contextmenu={()=>{mouseMode = MOUSE_RIGHT}}
         on:mouseenter={() => {
             if(mouseMode === MOUSE_OUT){
                mouseMode = MOUSE_IN;
                if (!bordersInterval) {
                    bordersInterval = setInterval(checkEditorBorders, 10);
                }
            }
         }}
         on:mouseleave={()=>{
             mouseMode = MOUSE_OUT;
             clearInterval(bordersInterval);
             bordersInterval = null;
         }}>
        <!--        <circle r="5" fill="red" cx="{mousePoint.x}" cy="{mousePoint.y}"/>-->
        {#each map.nodes as node}
            <Node onSelect="{selectNode}" bind:node={node} bind:width={node.width} bind:height={node.height}/>
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

