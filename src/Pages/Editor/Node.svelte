<script>
    import {afterUpdate, beforeUpdate, createEventDispatcher, onMount} from "svelte";
    import EditableText from "../../Svg/EditableText";
    import NodeEditor from "./NodeEditor.svelte";
    import RandomGenerator from "../../Svg/RandomGenerator";
    import {Vector} from "../../Lib/Math";
    import Link from "./Link.svelte";

    export let node;

    export let width = 0;
    export let height = 0;
    let lastText = "none";
    export let onSelect;
    let link = null;
    let edit = false;

    let editableText = new EditableText();

    let pathGenerator = new RandomGenerator();
    // const dispatch = createEventDispatcher();
    let lastUpdate = 0;
    let lastBbWidth = 0;
    let lastBbHeight = 0;
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
                let widthRate = bBox.width / lastBbWidth;

                let heightRate = bBox.height / lastBbHeight;
                if (widthRate >= 1.1 || heightRate >= 1.3 || widthRate < 1 || heightRate < 1) {
                    node.needRegen = true;
                    lastBbWidth = bBox.width;
                    lastBbHeight = bBox.height;
                }

            }
        }

        if (node.parent &&  node.textElement && node.pathElement && node.parent.pathElement ) {
            let parentPosition = new Vector(node.parent.x, node.parent.y)
            let childPosition = new Vector(node.x, node.y)

            let diff = childPosition.clone().sub(parentPosition);

            let cos = diff.x/diff.length();

            let parentAngle = Math.acos(cos);
            if(diff.y < 0){
                parentAngle = Math.PI*2 - parentAngle;
            }
            let childAngle = Math.PI + parentAngle;

            let parentPathLength = node.parent.pathElement.getTotalLength()/(Math.PI*2)*parentAngle;
            let childPathLength = node.pathElement.getTotalLength()/(Math.PI*2)*childAngle;

            let startPos = node.parent.pathElement.getPointAtLength(parentPathLength);
            // let endPos = node.pathElement.getPointAtLength(childPathLength);

            link = {
                parent: new Vector(startPos.x+node.parent.x, startPos.y+node.parent.y+node.parent.height/2),
                child: new Vector(node.x, node.y)
            }
            // console.log(link);
        }

        lastUpdate = Date.now().valueOf();
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

<g transform="translate({node.x},{node.y})">
    <g bind:this={node.textElement}>
        <text class="unselectable alexander" text-anchor="middle" font-size="20">
        </text>
    </g>

    <path bind:this={node.pathElement} id="border" on:mousedown={()=>onSelect(node)}
          transform="translate(0, {height/2})" d="{node.borderPath}" stroke="black"
          fill="transparent" stroke-width="{node.selected ? 4 : 2}" on:dblclick={() => {edit = !edit; }}/>

    <foreignObject transform="translate({-(width*1.2)/2}, {-height*1.5})" width="{width*1.2+2}px" height="{height}px">
        <div xmlns="http://www.w3.org/1999/xhtml">
            <NodeEditor bind:value={node.text} hidden={!edit} width="{width*1.2}" height="{height}"/>
        </div>
    </foreignObject>
</g>
{#if link}
    <Link bind:link/>
{/if}

<style>

</style>