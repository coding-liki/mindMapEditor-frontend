<script>
  import Header from './Header.svelte';

  import Index from './Index/Page.svelte';
  import Collection from './Collection/Page.svelte';
  import Editor from './Editor/Page.svelte';
  import EditorField from "../Svg/EditorField";

	let pageName = 'asdasd';
	let page = 'index';
	let map = {
		nodes: [
            EditorField.generateNode(window.innerWidth/2, window.innerHeight/2-115, 1),
            EditorField.generateNode(window.innerWidth/2-220, window.innerHeight/2-115, 2),
            EditorField.generateNode(window.innerWidth/2-220, window.innerHeight/2-300, 3),
        //     {
        //     id: 1,
        //     width: 0,
        //     height: 0,
		// 	x: window.innerWidth/2,
		// 	y: window.innerHeight/2-115,
		// 	text: "Очень Много Текста",
        //     borderPath: "",
        //     textElement: null,
        //     pathElement: null,
        //     selected: false
		// },{
        //     id: 2,
        //     width: 0,
        //     height: 0,
        //     x: window.innerWidth/2-220,
        //     y: window.innerHeight/2-115,
        //     text: "Очень Много Текста",
        //     borderPath: "",
        //     textElement: null,
        //     pathElement: null,
        //     selected: false
        // }
        ]
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
        flex: 1;
		text-align: center;
		font-size: 22px;
		font-weight: 600;
	}
</style>


