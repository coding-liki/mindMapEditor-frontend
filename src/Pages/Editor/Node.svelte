<script>
    import {afterUpdate, beforeUpdate, createEventDispatcher, onMount} from "svelte";
    import EditableText from "../../Svg/EditableText";
    import NodeEditor from "./NodeEditor.svelte";
    import RandomGenerator from "../../Svg/RandomGenerator";

    export let node;

    export let width = 0;
    export let height = 0;
    let lastText = "none";
    export let borderPath = "";
    export let textElement;
    export let onSelect;

    let edit = false;

    let editableText = new EditableText();

    let pathGenerator = new RandomGenerator();
    const dispatch = createEventDispatcher();

    onMount(() => {
        node = node;

        editableText.text = node.text;
        editableText = editableText;
        if (node.textElement) {
            editableText.getTSpans().forEach((span) => {
                node.textElement.children[0].appendChild(span);
            })
        }
    })
    beforeUpdate(() => {
        node = node;
        editableText.text = node.text;
        editableText = editableText;
        if (lastText !== node.text) {

            lastText = node.text;
            if (node.textElement) {
                let bBox = node.textElement.getBBox();
                node.borderPath = pathGenerator.generateBorder(bBox.width * 1.2, bBox.height * 2, -0.2, 0.4, 21);
            }
        }
    })
    afterUpdate(() => {

        node = node;

        if (node.textElement) {
            node.textElement.children[0].innerHTML = '';
            editableText.getTSpans().forEach((span) => {
                node.textElement.children[0].appendChild(span);
            })
            let bBox = node.textElement.getBBox();
            width = bBox.width + 2;
            height = bBox.height + 4;
        }
    });

</script>

<g  transform="translate({node.x},{node.y})">
    <g bind:this={node.textElement}>
        <text class="unselectable alexander" text-anchor="middle" font-size="20">
        </text>
    </g>

    pathElement: null,

    <path bind:this={node.pathElement} id="border" on:mousedown={()=>onSelect(node)}  transform="translate(0, {height/2})" d="{node.borderPath}" stroke="black"
          fill="transparent" stroke-width="{node.selected ? 4 : 2}" on:dblclick={() => {edit = !edit; }}/>
    <foreignObject transform="translate({-width/2}, {-height*1.5})" width="{width}px" height="{height}px">
        <div xmlns="http://www.w3.org/1999/xhtml">
            <NodeEditor bind:value={node.text} hidden={!edit} width="{width}" height="{height}"></NodeEditor>
        </div>
    </foreignObject>
</g>

<style>

</style>