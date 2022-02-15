<script>
	export let page = 'index';

	export let headerButtons = [	
	];

</script>

<header>
	<logo on:click={() => page = 'index'}>Vinilla La Puh <smaller>(Mind Maps)</smaller></logo>
	{#each headerButtons as headerButton }
		<button on:click={headerButton.page ? () => page = headerButton.page: headerButton.clickHandler}>{headerButton.name}</button>
	{/each}
</header>

<style>
	@font-face{
		font-family: "MarkScript";
		src: url("/fonts/MarckScript-Regular.ttf") format('truetype');
		font-weight: normal;
		font-style: normal;
	}

	header{
		display: flex;
		flex: 1;
	}
	header button{
		margin: 10px 5px;
	}

	logo {
		font-size: 32px;
		font-weight: 600;
		padding: 12px 4px;
		color: rgb(0, 0, 0);
		font-family: "MarkScript";
		cursor: default;
		
	}
	smaller {
		font-size: 22px;
		font-weight: 400;
	}
</style>

