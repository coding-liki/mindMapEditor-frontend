<script>
    export let value = "";
    export let hidden = true;
</script>
{#if !hidden}
    <textarea  bind:value></textarea>
{/if}