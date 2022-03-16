<script>
    import {afterUpdate, beforeUpdate} from "svelte";
    import {EventDispatcher} from "../../Lib/EventDispatcher";
    import {NODE} from "../../Lib/Constants/EventDispatcherNames";

    export let width;
    export let height;
    export let value = "";
    export let hidden = true;

    let lastHidden = true;

    let textArea;
    let eventDispatcher = EventDispatcher.instance(NODE);


    afterUpdate(()=>{
        if(hidden !== lastHidden){
            if(lastHidden && textArea) {
                console.log("focus");
                textArea.focus();
            }
            lastHidden = hidden;
        }

        console.log(value)
    })
</script>
    <textarea bind:this={textArea} class="{hidden ? 'hidden' : ''}" bind:value style="width: {width}px; height: {height}px; resize: none;"></textarea>

<style>

    textarea.hidden{
        display: none;
    }
</style>