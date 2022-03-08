<script>
	import BasePage from "../BasePage.svelte";
	export let pageName;
	export let enable = false;

</script>

<BasePage pageVisibleName="Index" bind:enable={enable} pageName='index'>
	<index> this is index </index>
</BasePage>


