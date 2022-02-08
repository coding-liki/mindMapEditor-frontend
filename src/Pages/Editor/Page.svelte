<script>
    import { onMount } from 'svelte';
	import BasePage from "../BasePage.svelte";
    import Node from "./Node.svelte";
	export let pageName;
	export let enable = false;
    export let map;
    export let zoom = 1;
    let previousZoom = 1;
    export let position = {x: 0, y: 0};
    let viewBox = {
        width: 100,
        height: 100
    };

    const MOVE_MODE = 'move';
    const ZOOM_MODE = 'zoom';
    const SELECT_MODE = 'select';
    const MOUSE_UP  = 'up';
    const MOUSE_DOWN  = 'down';

    let mode = MOVE_MODE;
    let mouseMode = MOUSE_UP;

    let mouseInitPosition = {
        x: 0,
        y: 0
    };
    let lastMousePosition = {
        x: 0,
        y: 0
    };
    
    let mouseDown = (event) => {
        mouseMode = MOUSE_DOWN;

        mouseInitPosition.x = event.offsetX;
        mouseInitPosition.y = event.offsetY;
        
        lastMousePosition.x = mouseInitPosition.x;
        lastMousePosition.y = mouseInitPosition.y;

        console.log(lastMousePosition);
    }

    
    let mouseUp = (event) => {
        mouseMode = MOUSE_UP;
        previousZoom = zoom;
    }

    let mouseMove = (event) => {

        let offsetX = event.offsetX - lastMousePosition.x;
        let offsetY = event.offsetY - lastMousePosition.y;

        lastMousePosition.x = event.offsetX;
        lastMousePosition.y = event.offsetY;
        
        if(mouseMode == MOUSE_DOWN) {
            switch (mode) {
                case MOVE_MODE:
                    position.x -= offsetX;
                    position.y -= offsetY;
                    break;
                case ZOOM_MODE:
                    let fullOffsetX = event.offsetX - mouseInitPosition.x;
                    let fullOffsetY = event.offsetY - mouseInitPosition.y;
                    
                    let dist = Math.sqrt(fullOffsetX*fullOffsetX+fullOffsetY*fullOffsetY);
                    if(fullOffsetX >0  ){
                        dist = -dist;
                    }

                    if(zoom < 1){
                        zoom = previousZoom + dist*zoom*0.001;
                    } else {
                        zoom = previousZoom +  dist/zoom*0.001;
                    }
                    // zoom = zoom + fullOffsetX/zoom*0.01;
                    if(zoom < 0) {
                        zoom = 0;
                    } else if(zoom > 100){
                        zoom =100;
                    }

                    console.log(zoom);
                    break;
                default:
                    break;
            }
        }
    }

    export let svgElement;

    let onWindowResize = () => {
        if(svgElement){
            viewBox.width = svgElement.parentNode.offsetWidth;
            viewBox.height = svgElement.parentNode.offsetHeight;
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
</script>

<BasePage bind:enable={enable} on:enabled={()=>{onWindowResize(); }} bind:pageName pageNameSet="Editor">
	<svg bind:this={svgElement} width="100%" height="100%" viewBox="{position.x*zoom} {position.y*zoom} {zoom*viewBox.width} {zoom*viewBox.height}" on:contextmenu={modeToggle} on:mousedown={mouseDown} on:mouseup={mouseUp} on:mousemove={mouseMove}>
        <rect x="0" y="0" width="30" height="30" stroke="black" fill="transparent" stroke-width="2"/>
    </svg> 
</BasePage>

<style>
    /* svg{
        display: block;
        height: 100%;
        width: 100%;
    } */
</style>

