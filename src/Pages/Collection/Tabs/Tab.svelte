<script>
    import {EventDispatcher} from "../../../Lib/EventDispatcher";

    export let active = false;
    export let name = '';

    EventDispatcher.instance().subscribe('activateTab', (event) => {
        active = event.name === name;
        console.log("clicked", event);
    })

    function onClick(event) {
        active = true;
        EventDispatcher.instance().dispatch('activateTab', {
            name: name
        });
    }
</script>
<tab class="{active ? 'active' : ''}" on:click={onClick}>
    <slot></slot>
</tab>

<style>

    tab {
        height: 100%;
        display: flex;
        flex-grow: 1;
        justify-content: center;
        background-color: burlywood;
        color: black;
    }

    tab.active {
        background-color: chocolate;
    }

    tab:hover {
        background-color: chocolate;
        transition-duration: 0.5s;
    }
</style>