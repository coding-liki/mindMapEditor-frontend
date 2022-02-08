<script>
	import BasePage from "../BasePage.svelte";
	export let pageName;
	export let enable = false;

</script>

<BasePage bind:enable={enable} bind:pageName pageNameSet="Index">
	<index> this is index </index>
</BasePage>


