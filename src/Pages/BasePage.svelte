<script lang='ts'>
    import {EventDispatcher} from "../Lib/EventDispatcher";

    export let enable = false;
    let lastEnable = false;
    export let pageName;
    export let pageVisibleName;
    import {beforeUpdate, afterUpdate} from 'svelte';
    import {PAGE} from "../Lib/Constants/EventDispatcherNames";
    import {
        PAGE_ENABLED_BEFORE,
        PageDisabledAfter,
        PageDisabledBefore,
        PageEnabledAfter,
        PageEnabledBefore, PageSetName
    } from "../Lib/Constants/Events";

    export let dispatcher = EventDispatcher.instance(PAGE);


    $: dispatcher.subscribe(PAGE_ENABLED_BEFORE, (event) => {
        enable = event.pageName === pageName;
    })

    beforeUpdate(() => {
        if (enable !== lastEnable) {
            if (enable) {
                dispatcher.dispatch(new PageEnabledBefore(pageName))
                dispatcher.dispatch(new PageSetName(pageVisibleName));
            } else {
                dispatcher.dispatch(new PageDisabledBefore(pageName))
            }
        }
    });

    afterUpdate(() => {
        if (enable !== lastEnable) {
            if (enable) {
                dispatcher.dispatch(new PageEnabledAfter(pageName));
            } else {
                dispatcher.dispatch(new PageDisabledAfter(pageName));
            }
            lastEnable = enable;
        }
    })
</script>

{#if enable}
    <page class="">
        <slot></slot>
    </page>
{/if}

<style>
    page {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 10;
    }
</style>

