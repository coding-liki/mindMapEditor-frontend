<script>
    import Container from './Pages/Container.svelte';
    import {afterUpdate} from "svelte";
    import KeyPressHandler from "./Lib/KeyPressHandler";

    let site;
    let eventsAdded = false;
    let keyHandler = new KeyPressHandler();

    afterUpdate(() => {
        if (site && !eventsAdded) {
            keyHandler.subscribe(site);
            eventsAdded = true;
        }
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