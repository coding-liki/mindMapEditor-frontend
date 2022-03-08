<script lang="ts">
    import BasePage from "../BasePage.svelte";
    import {Camera} from "../../Lib/Svg/Editor/Camera";
    import {Vector} from "../../Lib/Math";
    import {ViewPort} from "../../Lib/Svg/Editor/ViewPort";
    import {beforeUpdate} from "svelte";
    import {EventDispatcher} from "../../Lib/EventDispatcher";
    import {PAGE} from "../../Lib/Constants/EventDispatcherNames";
    import {PAGE_ENABLED_AFTER, PAGE_ENABLED_BEFORE} from "../../Lib/Constants/Events";
    import NodeNew from "./NodeNew.svelte";

    export let map;
    let camera = new Camera(new Vector(0, 0, -1), new ViewPort(new Vector(0, 0), new Vector(0, 0)))
    let editor;
    let viewPort;
    let mousePosition = new Vector();
    let lastMousePosition = new Vector();
    let lastMouseEvent;
    let mouseEvent;
    const MOUSE_STATE_DOWN = 'down';
    const MOUSE_STATE_UP = 'up';

    const MOUSE_MODE_MOVE = 'move';

    let mouseState = MOUSE_STATE_UP;
    let mouseMode = MOUSE_MODE_MOVE;

    export let dispatcher = EventDispatcher.instance(PAGE);

    dispatcher.subscribe(PAGE_ENABLED_AFTER, (event) => {
        if (event.pageName === "editor") {
            onWindowResize();
        }
    })
    beforeUpdate(() => {

        if (camera) {
            viewPort = camera.getViewPort();
        }
    })


    function onWindowResize() {
        if (editor) {
            let computedStyle = getComputedStyle(document.body);

            let editorRect = editor.parentNode.getBoundingClientRect();
            let width = document.body.offsetWidth - editorRect.left - parseFloat(computedStyle.paddingTop) - parseFloat(computedStyle.paddingBottom);
            let height = document.body.offsetHeight - editorRect.top - parseFloat(computedStyle.paddingLeft) - parseFloat(computedStyle.paddingRight);

            let newPosition = camera.position.clone().subXY(width / 2, height / 2);
            newPosition.z = 0;
            let newDimensions = new Vector(width, height);
            camera = new Camera(camera.position.clone(), new ViewPort(newPosition, newDimensions));
        }
    }

    function mouseMove(event) {
        lastMouseEvent = mouseEvent;
        mouseEvent = event;

        // lastMousePosition = mousePosition.clone();
        updateMousePosition();

        if (mouseState === MOUSE_STATE_DOWN) {
            processMouseMove();
        }
    }

    function processMouseMove() {
        switch (mouseMode) {
            case MOUSE_MODE_MOVE:
                camera.move(new Vector(lastMouseEvent.clientX - mouseEvent.clientX, lastMouseEvent.clientY - mouseEvent.clientY));
                viewPort = camera.getViewPort();

                break;
        }
    }

    function zoom(event) {
        let delta = event.deltaY * (-0.0003);
        camera.zoom(mousePosition, delta);
        viewPort = camera.getViewPort();

        updateMousePosition()
    }

    function updateMousePosition() {
        lastMousePosition = mousePosition.clone();
        if (lastMouseEvent && editor) {
            let computedStyle = getComputedStyle(editor);

            let editorRect = editor.getBoundingClientRect();
            let widthRatio = camera.initViewPort.dimensions.x / viewPort.dimensions.x;
            let heightRatio = camera.initViewPort.dimensions.y / viewPort.dimensions.y;

            mousePosition = new Vector(
                lastMouseEvent.clientX - editorRect.left - parseFloat(computedStyle.borderLeftWidth),
                lastMouseEvent.clientY - editorRect.top - parseFloat(computedStyle.borderTopWidth)
            );
            mousePosition.x /= widthRatio;
            mousePosition.y /= heightRatio;

            mousePosition.add(viewPort.position);
        }
    }

    onWindowResize();
    window.onresize = onWindowResize;


</script>

<BasePage on:resize pageVisibleName="Editor" pageName="editor">
    <svg
            on:mousemove={mouseMove}
            on:wheel={zoom}
            on:mousedown={()=>{mouseState = MOUSE_STATE_DOWN}}
            on:mouseup={()=>{mouseState = MOUSE_STATE_UP}}
            bind:this={editor}
            width="{camera.initViewPort.dimensions.x}" height="{camera.initViewPort.dimensions.y}"
            viewBox="{viewPort.position.x}, {viewPort.position.y}, {viewPort.dimensions.x}, {viewPort.dimensions.y}">
        <circle cx="0" cy="0" r="5" fill="red"/>
        <circle cx="10" cy="10" r="5" fill="red"/>
        {#each map.nodes as node }
            <NodeNew node={node}/>
        {/each}
    </svg>
</BasePage>

<style>
    svg {
        border: 2px solid black;
    }
</style>