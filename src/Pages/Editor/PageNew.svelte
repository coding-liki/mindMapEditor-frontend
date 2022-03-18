<script lang="ts">
    import BasePage from "../BasePage.svelte";
    import {beforeUpdate, onMount} from "svelte";
    import NodeNew from "./NodeNew.svelte";
    import NodeEditor from "./NodeEditor.svelte";
    import {StateProcessor} from "../../Processors/Editor/StateProcessor";
    import {MouseProcessor} from "../../Processors/Editor/MouseProcessor";
    import {EventDispatcher} from "../../Lib/EventDispatcher";
    import {NODE, PAGE} from "../../Lib/Constants/EventDispatcherNames";
    import {NODE_START_EDIT, PAGE_UPDATED} from "../../Lib/Constants/Events";

    export let map;
    let stateProcessor = new StateProcessor();
    let mouseProcessor = new MouseProcessor(stateProcessor);

    let nodeDispatcher = EventDispatcher.instance(NODE)

    nodeDispatcher.subscribe(NODE_START_EDIT, (event) => {
        stateProcessor = stateProcessor;
    })
    //
    // pageDispatcher.subscribe(PAGE_UPDATED, (event) => {
    //     if(event.pageName === "editor"){
    //         console.log('myUpdate');
    //     }
    // })
    onMount(() => {
        stateProcessor.init();
        window.onresize = () => {
            stateProcessor.onWindowResize();
            stateProcessor = stateProcessor;

        }

    })


    beforeUpdate(() => {
        stateProcessor.beforeUpdate();
        stateProcessor = stateProcessor;
    })

</script>

<BasePage on:resize pageVisibleName="Editor" pageName="editor">
    <svg
            on:mousemove={(event)=> {mouseProcessor.mouseMove(event); stateProcessor = stateProcessor;}}
            on:wheel={(event) => {mouseProcessor.zoom(event); stateProcessor = stateProcessor;}}
            on:mousedown={()=>{mouseProcessor.mouseState = MouseProcessor.MOUSE_STATE_DOWN}}
            on:mouseup={()=>{mouseProcessor.mouseState = MouseProcessor.MOUSE_STATE_UP}}
            bind:this={stateProcessor.svgNode}
            width="{ stateProcessor.camera.initViewPort.dimensions.x}" height="{ stateProcessor.camera.initViewPort.dimensions.y}"
            viewBox="{ stateProcessor.viewPort.position.x}, { stateProcessor.viewPort.position.y}, { stateProcessor.viewPort.dimensions.x}, { stateProcessor.viewPort.dimensions.y}">
        <circle cx="0" cy="0" r="5" fill="red"/>
        <circle cx="10" cy="10" r="5" fill="red"/>
        {#each map.nodes as node }
            <NodeNew nodeView={node}/>
        {/each}
        {#if  stateProcessor.editedNodeView}
            <foreignObject transform="translate({-( stateProcessor.editedNodeView.nodeTextWidth*1.2)/2+ stateProcessor.editedNodeView.node.position.x}, { stateProcessor.editedNodeView.node.position.y})"
                           width="{ stateProcessor.editedNodeView.nodeTextWidth*1.2+2}px" height="{ stateProcessor.editedNodeView.nodeTextHeight+4}px">
                <div xmlns="http://www.w3.org/1999/xhtml">
                    <NodeEditor bind:value={ stateProcessor.editedNodeView.node.text} nodeId="{ stateProcessor.editedNodeView.node.id}" hidden={false}
                                width="{ stateProcessor.editedNodeView.nodeTextWidth*1.2}" height="{ stateProcessor.editedNodeView.nodeTextHeight+4}"/>
                </div>
            </foreignObject>
        {/if}
    </svg>
</BasePage>

<style>
    svg {
        border: 2px solid black;
    }
</style>