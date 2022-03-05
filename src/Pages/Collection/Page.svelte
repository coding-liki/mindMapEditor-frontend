<script>
	import BasePage from "../BasePage.svelte";
	// import {api} from "../../Api/MindMap/Api.js";
	import LoginRegister from "./Modal/LoginRegister.svelte";
	import AuthService from "../../Lib/AuthService";
	export let pageName;
	export let enable = false;
	let collection = [];
	let authService = new AuthService();
	let modalOpen = false;
	function updateCollection(){
		authService.check();
	}
</script>

<BasePage bind:enable={enable} bind:pageName pageNameSet="Collection" on:beforeEnabled={updateCollection}>
	<LoginRegister bind:isOpen={modalOpen}/>

	<!--{#await collection}-->
	<!--	<p>...Загружаем</p>-->
	<!--{:then result} -->
	<!--	&lt;!&ndash;{#each result.maps as mindMap}&ndash;&gt;-->
	<!--	&lt;!&ndash;	<map>&ndash;&gt;-->
	<!--	&lt;!&ndash;		<id>id = {mindMap.id}</id>&ndash;&gt;-->
	<!--	&lt;!&ndash;		<name>name = {mindMap.name}</name>&ndash;&gt;-->
	<!--	&lt;!&ndash;	</map>&ndash;&gt;-->
	<!--	&lt;!&ndash;{/each}&ndash;&gt;-->
	<!--{:catch error}-->
	<!--	<p>{error.message}</p>-->
	<!--{/await}-->
</BasePage>


