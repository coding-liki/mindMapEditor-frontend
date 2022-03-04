<script>
    import Header from './Header.svelte';

    import Index from './Index/Page.svelte';
    import Collection from './Collection/Page.svelte';
    import Editor from './Editor/Page.svelte';
    import EditorField from "../Svg/EditorField";
    import BaseModal from "./Collection/Modal/BaseModal.svelte";
    import LoginRegister from "./Collection/Modal/LoginRegister.svelte";

    let pageName = 'asdasd';
    let page = 'index';

    let modalOpen = false;
    let map = {
        nodes: [
            EditorField.generateNode(window.innerWidth / 2, window.innerHeight / 2 - 115, 1),
            EditorField.generateNode(window.innerWidth / 2 - 220, window.innerHeight / 2 - 115, 2),
            EditorField.generateNode(window.innerWidth / 2 - 220, window.innerHeight / 2 - 300, 3)
        ]
    }
    let headerButtons = [
        {
            name: "Collection",
            page: "collection"
        },
        {
            name: "New Map",
            clickHandler: () => {
                page = 'editor'
            }
        }
    ];


</script>

<Header {headerButtons} bind:page/>
<name on:click={() => {modalOpen = true;}}>{pageName}</name>
<Index enable={ page==="index"} bind:pageName/>
<Collection enable={ page==="collection"} bind:pageName/>
<Editor enable={page === "editor"} bind:map bind:pageName/>
<LoginRegister bind:isOpen={modalOpen}/>

<style>
    name {
        flex: 1;
        text-align: center;
        font-size: 22px;
        font-weight: 600;
    }
</style>


