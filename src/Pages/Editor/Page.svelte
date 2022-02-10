<script>
    import { onMount } from 'svelte';
	import BasePage from "../BasePage.svelte";
    import EditorField from "../../Svg/EditorField"
    import RandomGenerator from "../../Svg/RandomGenerator"
    import Node from "./Node.svelte";
import { Vector } from '../../Lib/Math';

    export let editorField = new EditorField(100, 100);
	export let pageName;
	export let enable = false;
    export let map;
    export let position = {x: 0, y: 0};

    const MOVE_MODE = 'move';
    const ZOOM_MODE = 'zoom';
    const SELECT_MODE = 'select';
    const MOUSE_UP  = 'up';
    const MOUSE_DOWN  = 'down';

    let mode = MOVE_MODE;
    let mouseMode = MOUSE_UP;
    let viewBoxString = editorField.getViewBoxString();

    let mouseDown = (event) => {
        mouseMode = MOUSE_DOWN;

        editorField.updateMousePostion(event.offsetX, event.offsetY);
        editorField.freezeMousePosition();
    }

    let mouseUp = (event) => {
        mouseMode = MOUSE_UP;
        editorField.freezeZoom();
    }

    let mouseMove = (event) => {
        
        editorField.updateMousePostion(event.offsetX, event.offsetY);
        mousePoint = editorField.mousePosition.clone().add(editorField.position).mul(editorField.zoom);
        if(mouseMode == MOUSE_DOWN) {
            switch (mode) {
                case MOVE_MODE:
                    editorField.movePositionByMousePosition();
                    viewBoxString = editorField.getViewBoxString()
                    break;
                case ZOOM_MODE:
                    editorField.updateZoomByMousePosition();
                    viewBoxString = editorField.getViewBoxString()
                    break;
                default:
                    break;
            }
        }
    }

    export let svgElement;

    let onWindowResize = () => {
    
        if(svgElement){
            editorField.updateViewBox(svgElement.parentNode.offsetWidth, svgElement.parentNode.offsetHeight);
            viewBoxString = editorField.getViewBoxString();
        }
    }

    window.onresize = onWindowResize;
    let modeToggle = (ev) => {
        ev.preventDefault();

        if(mode === MOVE_MODE){
            mode = ZOOM_MODE;
        } else {
            mode = MOVE_MODE;
        }
    }
    let pathGenerator = new RandomGenerator();
    let path = pathGenerator.generateBorder(100,50, -0.3,0.5, 12);
    let pathPosiotion = new Vector(100,100);
    let pathX = 15;
    let pathY = 15;
    let mousePoint = new Vector(0,0);
</script>

<BasePage bind:enable={enable} on:afterEnabled={()=>{onWindowResize(); }} bind:pageName pageNameSet="Editor">
	<svg bind:this={svgElement} width="100%" height="100%" viewBox="{viewBoxString}" on:contextmenu={modeToggle} on:mousedown={mouseDown} on:mouseup={mouseUp} on:mousemove={mouseMove}>
        <rect x="0" y="0" width="30" height="30" stroke="black" fill="transparent" stroke-width="2"/>
            <path d="{path}" transform="translate({pathX},{pathY})" stroke="black" fill="transparent" stroke-width="2"/>
        <circle cx="{mousePoint.x}" cy="{mousePoint.y}" r="2" fill="red"/>
    </svg> 
</BasePage>

<style>
    /* svg{
        display: block;
        height: 100%;
        width: 100%;
    } */
</style>

