<script>
    import {afterUpdate, beforeUpdate} from "svelte";
    import {EventDispatcher} from "../../Lib/EventDispatcher";
    import {NODE} from "../../Lib/Constants/EventDispatcherNames";
    import {NODE_UPDATE_TEXT} from "../../Lib/Constants/Events";
    import NodeEditor from "./NodeEditor.svelte";

    export let nodeView;

    let generated = false;
    let edit = false;

    let eventDispatcher = EventDispatcher.instance(NODE);

    eventDispatcher.subscribe(NODE_UPDATE_TEXT, (event) => {
       if(event.nodeId !== nodeView.node.id){
           return;
       }

        nodeView.refillText();
    });


    beforeUpdate(() => {
        if (!generated || !nodeView.nodePath) {
            nodeView.refillText();
            generated = true;
        }
    });
</script>

<!--{#if nodeView}-->
<g bind:this={nodeView.nodeElement} transform="translate({nodeView.node.position.x},{nodeView.node.position.y})">

    <g transform="translate(0, {(nodeView.nodeTextHeight+6)/2})">
        {#if nodeView.nodePath}

            <path
                    on:dblclick={() => {edit = !edit; }}
                    stroke="black"
                    fill="white" stroke-width="2"
                    d="{nodeView.nodePath}"/>
        {/if}
    </g>
    <g class="text">
        <text class="unselectable alexander" text-anchor="middle" font-size="20">
        </text>
    </g>
    <foreignObject transform="translate({-(nodeView.nodeTextWidth*1.2)/2}, {-nodeView.nodeTextHeight*1.5})" width="{nodeView.nodeTextWidth*1.2+2}px" height="{nodeView.nodeTextHeight}px">
        <div xmlns="http://www.w3.org/1999/xhtml">
            <NodeEditor bind:value={nodeView.node.text} hidden={!edit} width="{nodeView.nodeTextWidth*1.2}" height="{nodeView.nodeTextHeight}"/>
        </div>
    </foreignObject>
    <circle r="3" cx="0" cy="0" fill="red"/>
</g>
<!--{/if}-->
<style>
    .colorWhite {
        color: white;
    }

    .colorTransparent {
        color: transparent;
    }
</style>