<script>
    import {afterUpdate, onMount} from 'svelte';
    import BasePage from "../BasePage.svelte";
    import EditorField from "../../Svg/EditorField"
    import RandomGenerator from "../../Svg/RandomGenerator"
    import Node from "./Node.svelte";
    import {Vector} from '../../Lib/Math';

    export let editorField = new EditorField(100, 100);
    export let pageName;
    export let enable = false;
    export let map;
    export let position = {x: 0, y: 0};

    const MOVE_MODE = 'move';
    const ZOOM_MODE = 'zoom';
    const SELECT_MODE = 'select';
    const MOUSE_UP = 'up';
    const MOUSE_DOWN = 'down';

    let mode = MOVE_MODE;
    let mouseMode = MOUSE_UP;

    let mouseDown = (event) => {
        mouseMode = MOUSE_DOWN;

        editorField.updateMousePosition(event.offsetX, event.offsetY);
        editorField.freezeMousePosition();
        editorField = editorField;

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
                node.path = pathGenerator.generateBorder(bBox.width*1.2, bBox.height*2, -0.2, 0.4, 24);
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
    let pathGenerator = new RandomGenerator();

    let mousePoint = new Vector(0, 0);

</script>

<BasePage bind:enable={enable} on:afterEnabled={()=>{onWindowResize(); }} bind:pageName pageNameSet="Editor">
    <svg bind:this={svgElement} width="100%"  viewBox="{editorField.getViewBoxString()}" on:contextmenu={modeToggle}
         on:mousedown={mouseDown} on:mouseup={mouseUp} on:mousemove={mouseMove}>
        {#each map.nodes as node}
            <Node x="{node.x}" y="{node.y}" text="{node.text}" borderPath="{node.path}" bind:textElement={node.textElement}/>
        {/each}
    </svg>
</BasePage>

<style>
    /* svg{
        display: block;
        height: 100%;
        width: 100%;
    } */
</style>

