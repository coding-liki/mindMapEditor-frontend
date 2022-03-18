<script>
    import {beforeUpdate, onMount} from "svelte";
    import {EventDispatcher} from "../../Lib/EventDispatcher";
    import {NODE} from "../../Lib/Constants/EventDispatcherNames";
    import {NODE_UPDATE_TEXT, NodeStartEdit} from "../../Lib/Constants/Events";
    import {KeyPressHandler} from "../../Lib/KeyPressHandler";

    export let nodeView;

    let generated = false;
    let edit = false;

    let eventDispatcher = EventDispatcher.instance(NODE);
    let keyboardHandler = new KeyPressHandler();

    eventDispatcher.subscribe(NODE_UPDATE_TEXT, (event) => {
       if(event.nodeId !== nodeView.node.id){
           return;
       }
        nodeView.refillText();
        nodeView = nodeView;
    });


    beforeUpdate(() => {
        if (!generated || !nodeView.nodePath) {
            nodeView.refillText();
            generated = true;
        }
    });
    onMount(() => {
        keyboardHandler.subscribe();
    })
</script>

{#if nodeView}
<g bind:this={nodeView.nodeElement} transform="translate({nodeView.node.position.x},{nodeView.node.position.y})">

    <g class="colorWhite">
        <path id="border{nodeView.node.id}"
              transform="translate(0, {(nodeView.nodeTextHeight+6)/2})" d="{nodeView.nodePath}" stroke="black"
              fill="currentColor" stroke-width="2"/>
    </g>

    <g transform="translate(0, {(nodeView.nodeTextHeight+6)/2})">
        {#if nodeView.nodePath}

            <path
                    stroke="black"
                    fill="white" stroke-width="2"
                    d="{nodeView.nodePath}"/>
        {/if}
    </g>
    <g class="text">
        <text class="unselectable alexander" text-anchor="middle" font-size="20">
        </text>
    </g>
    <g class="colorTransparent">
        <use xlink:href="#border{nodeView.node.id}" fill="transparent"
             on:dblclick={() => {
                 console.log('dbclicked');
                 eventDispatcher.dispatch(new NodeStartEdit(nodeView));
             }}/>
    </g>

</g>
{/if}
<style>
    .colorWhite {
        color: white;
    }

    .colorTransparent {
        color: transparent;
    }
</style>