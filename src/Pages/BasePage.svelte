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

        if(enable !== lastEnable){
            if(enable){
                dispatch('beforeEnabled');
            } else {
                dispatch('beforeDisabled');
            }
        }
	});

    afterUpdate(() => {
        if(enable !== lastEnable){
            if(enable){
                dispatch('afterEnabled');
            } else {
                dispatch('afterDisabled');
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

