<script>
  import Header from './Header.svelte';

  import Index from './Index/Page.svelte';
  import Collection from './Collection/Page.svelte';
  import Editor from './Editor/Page.svelte';

	let pageName = 'asdasd';
	let page = 'index';
	let map = {
		nodes: [{
			x: window.innerWidth/2,
			y: window.innerHeight/2-115,
			text: "First"
		}]
	}
	let headerButtons = [
		{
			name: "Collection",
			page: "collection"
		},
		{
			name: "New Map",
			clickHandler: ()=> {
				page = 'editor'
			}
		}
	];


</script>

<Header {headerButtons} bind:page/>
<name >{pageName}</name>
<Index enable={ page=="index"} bind:pageName/>
<Collection enable={ page=="collection"} bind:pageName/>
<Editor enable={page == "editor"} bind:map bind:pageName/>

<style>
	name{
		grid-template-columns: 1fr;
		text-align: center;
		font-size: 22px;
		font-weight: 600;
	}
</style>


