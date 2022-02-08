<script>
    export let x;
    export let y;

    export let text;
</script>
<node style="left: {x}px; top: {y}px;">{text}</node>
<style>
    node{
        position: relative;
    }
</style>