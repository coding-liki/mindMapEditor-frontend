<script>
    export let enable = false;
    let lastEnable = false;
    export let pageNameSet = '';
    export let pageName;
    import { beforeUpdate, afterUpdate, createEventDispatcher} from 'svelte';
	
    const dispatch = createEventDispatcher();

    beforeUpdate(() => {
		if(enable){
            pageName = pageNameSet
            console.log(pageName, pageNameSet);
        }
	});

    afterUpdate(() => {
        if(enable !== lastEnable){
            if(enable){
                dispatch('enabled');
            } else {
                dispatch('disabled');
            }
            lastEnable = enable;
        }
    })
</script>

{#if enable}
<page class="full-parent">
    <slot></slot>
</page>
{/if}

