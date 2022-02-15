<script>
    import {afterUpdate, beforeUpdate, onMount} from "svelte";
    import EditableText from "../../Svg/EditableText";
    import NodeEditor from "./NodeEditor.svelte";
    import RandomGenerator from "../../Svg/RandomGenerator";

    export let x;
    export let y;
    export let width = 0;
    export let height = 0;

    export let text = "";
    let lastText = "";
    export let borderPath = "";
    export let textElement;
    let edit = false;

    let editableText = new EditableText();

    let pathGenerator = new RandomGenerator();
    afterUpdate(() => {
        console.log(text);
        editableText.text = text;
        editableText = editableText;
        if(lastText !== text) {
            lastText = text;
            if(textElement) {
                let bBox = textElement.getBBox();
                borderPath = pathGenerator.generateBorder(bBox.width * 1.2, bBox.height * 2, -0.2, 0.4, 24);
            }
        }
    });
    onMount(() => {
        editableText.text = text;
        editableText = editableText;
        if (textElement) {
            editableText.getTSpans().forEach((span) => {
                textElement.children[0].appendChild(span);
            })
        }
    })
    afterUpdate(() => {
        if (textElement) {
            textElement.children[0].innerHTML = '';
            editableText.getTSpans().forEach((span) => {
                textElement.children[0].appendChild(span);
            })
            let bBox = textElement.getBBox();
            console.log(bBox);
            width = bBox.width + 2;
            height = bBox.height + 4;
        }
    });

</script>

<g transform="translate({x},{y})" on:dblclick={() => {edit = true; console.log(edit)}}>
    <g bind:this={textElement} style="display: block">
        <text class="unselectable alexander" text-anchor="middle" font-size="20">
        </text>
    </g>

    <path style="display: block" transform="translate({0}, {height/2})" d="{borderPath}" stroke="black"
          fill="transparent" stroke-width="2"/>
    <foreignObject transform="translate({-width/2}, {-height*2})" width="{width}" height="{height}">
        <div xmlns="http://www.w3.org/1999/xhtml">
            <NodeEditor bind:value={text} hidden={!edit}></NodeEditor>
        </div>
    </foreignObject>
</g>

<style>

</style>