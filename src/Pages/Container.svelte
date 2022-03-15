<script lang="ts">
    import Header from './Header.svelte';

    import Index from './Index/Page.svelte';
    import Collection from './Collection/Page.svelte';
    import Editor from './Editor/PageNew.svelte';
    import EditorField from "../Svg/EditorField";
    import BaseModal from "./Collection/Modal/BaseModal.svelte";
    import LoginRegister from "./Collection/Modal/LoginRegister.svelte";
    import {EventDispatcher} from "../Lib/EventDispatcher";
    import {PAGE} from "../Lib/Constants/EventDispatcherNames";
    import {PAGE_SET_NAME, PageEnabledBefore} from "../Lib/Constants/Events";
    import RandomGenerator from "../Svg/RandomGenerator";

    let pageName = 'asdasd';
    let page = 'index';

    let modalOpen = false;

    let map = {
        nodes: [
            RandomGenerator.generateNode(0, -115, 1),
            RandomGenerator.generateNode(-220, -115, 2),
            RandomGenerator.generateNode(-220, -300, 3)
        ]
    }

    let pageDispatcher = EventDispatcher.instance(PAGE);

    pageDispatcher.subscribe(PAGE_SET_NAME, (event) => {
        pageName = event.pageVisibleName;
    })
    let headerButtons = [
        {
            name: "Collection",
            clickHandler: () => {
                pageDispatcher.dispatch(new PageEnabledBefore('collection'))
            }
        },
        {
            name: "New Map",
            clickHandler: () => {
                pageDispatcher.dispatch(new PageEnabledBefore('editor'))
            }
        }
    ];


</script>

<Header {headerButtons} bind:page/>
<name on:click={() => {modalOpen = true;}}>{pageName}</name>
<Index enable={true} bind:pageName/>
<!--<Collection enable={ page==="collection"} bind:pageName/>-->
<Editor bind:map bind:pageName/>

<style>
    name {
        flex: 1;
        text-align: center;
        font-size: 22px;
        font-weight: 600;
    }
</style>


