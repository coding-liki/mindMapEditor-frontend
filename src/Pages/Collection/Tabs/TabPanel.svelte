<script>
    import {EventDispatcher} from "../../../Lib/EventDispatcher";

    let active = false;
    export let name;

    EventDispatcher.instance().subscribe('activateTab', (event) => {
        active = event.name === name;
    })
</script>
<tabPanel class="{active ? 'active' : ''}">
    <slot/>
</tabPanel>

<style>
    tabPanel {
        display: none;
    }

    tabPanel.active{
        display: block;
    }
</style>

