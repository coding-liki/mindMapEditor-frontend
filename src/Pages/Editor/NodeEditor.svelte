<script>
    import {afterUpdate} from "svelte";

    export let width;

    export let height;
    export let value = "";
    export let hidden = true;
</script>
    <textarea class="{hidden ? 'hidden' : ''}" bind:value style="width: {width}px; height: {height}px"></textarea>

<style>

    textarea.hidden{
        display: none;
    }
</style>