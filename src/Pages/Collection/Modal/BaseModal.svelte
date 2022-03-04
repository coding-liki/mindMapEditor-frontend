<script>
    import MdClose from 'svelte-icons/md/MdClose.svelte'
    export let isOpen = false;
    export let width = '50%';
    export let height  = '50%';
    function closeModal(){
        isOpen = false;
    }
</script>

<div id="background" style="--display: {isOpen ? 'block' : 'none'};" on:click={closeModal}></div>
<div id="modal" style="--display: {isOpen ? 'block' : 'none'}; --width: {width}; --height: {height};">
    <header>
        <buttons><div on:click={closeModal}><MdClose /></div></buttons>
    </header>
    <slot/>
</div>

<style>
    #background {
        display: var(--display);
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
    }

    #modal {
        display: var(--display);
        position: fixed;
        z-index: 2;
        padding: 5px;
        top: 50%;
        left: 50%;
        width: var(--width);
        height: var(--height);
        transform: translate(-50%, -50%);
        background: #fff;
        filter: drop-shadow(0 0 20px #333);
    }
    header{
        display: inline-flex;
        justify-content: right;
        width: 100%;
        height: 20px;
    }
    buttons{
        display: block;
        height: 100%;
    }

    buttons > div{
        height: 100%;
    }
    buttons > div:hover {
        filter: drop-shadow(0 0 3px #333);
        cursor: pointer;
    }
</style>