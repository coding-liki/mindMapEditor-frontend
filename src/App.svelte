<script>
    import Container from './Pages/Container.svelte';
    import {afterUpdate} from "svelte";

    let site;
    let eventsAdded = false;

    afterUpdate(() => {

    })
</script>

<site bind:this={site} class="">
    <Container/>
</site>

<style>
    site {
        display: flex;
        flex-direction: column;
        flex: 10;
        position: relative;
        height: 100%;
    }
</style>