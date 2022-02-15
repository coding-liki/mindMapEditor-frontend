<script>
    import {afterUpdate} from "svelte";

    export let value = "";
    export let hidden = true;
</script>
    <textarea class="{hidden ? 'hidden' : ''}" bind:value></textarea>

<style>
    textarea.hidden{
        display: none;
    }
</style>