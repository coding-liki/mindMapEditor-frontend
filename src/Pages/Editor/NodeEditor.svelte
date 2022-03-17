<script>
    import {afterUpdate, beforeUpdate} from "svelte";
    import {EventDispatcher} from "../../Lib/EventDispatcher";
    import {NODE} from "../../Lib/Constants/EventDispatcherNames";
    import {NodeUpdateText} from "../../Lib/Constants/Events";

    export let width;
    export let height;
    export let value = "";
    export let hidden = true;
    export let nodeId;
    let lastHidden = true;

    let textArea;
    let eventDispatcher = EventDispatcher.instance(NODE);


    afterUpdate(() => {
        if (hidden !== lastHidden) {
            if (lastHidden && textArea) {
                console.log("focus");
                textArea.focus();
            }
            lastHidden = hidden;
        }

        eventDispatcher.dispatch(new NodeUpdateText(nodeId));

        console.log(value)
    })
</script>
<textarea bind:this={textArea} class="{hidden ? 'hidden' : ''}" bind:value
          style="width: {width}px; height: {height}px; resize: none;"></textarea>

<style>
    textarea {
        z-index: 100;
    }

    textarea.hidden {
        display: none;
    }
</style>