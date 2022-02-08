<script>
	import BasePage from "../BasePage.svelte";
	import {api} from "../../Api/MindMap/Api.js";
	export let pageName;
	export let enable = false;
	let collection;
	function updateCollection(){
		collection = api.list();
	}
</script>

<BasePage bind:enable={enable} bind:pageName pageNameSet="Collection" on:enabled={updateCollection}>
	{#await collection}
		<p>...Загружаем</p>
	{:then result} 
		{#each result.maps as mindMap}
			<map>
				<id>id = {mindMap.id}</id>
				<name>name = {mindMap.name}</name>
			</map>
		{/each}
	{:catch error}
		<p>{error.message}</p>
	{/await}
</BasePage>


