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
        if (node.textElement) {
            editableText.getTSpans().forEach((span) => {
                node.textElement.children[0].appendChild(span);
            })
        }

        editableText = editableText;

    })
    beforeUpdate(() => {
        editableText.text = node.text;
        editableText = editableText;
        if (node.parent  && node.pathElement && node.parent.pathElement) {
            if (node.needRecalcLink) {
                node.needRecalcLink = false;
                setTimeout(recalcLink, 10);
                // node = node;
            }
        }

        if (lastText !== node.text) {

            lastText = node.text;
            if (node.textElement) {
                node.needRecalcLink = true;

                let bBox = node.textElement.getBBox();
                let widthRate = bBox.width / lastBbWidth;

                let heightRate = bBox.height / lastBbHeight;
                if (widthRate >= 1.1 || heightRate >= 1.3 || widthRate < 1 || heightRate < 1) {
                    node.needRegen = true;
                    lastBbWidth = bBox.width;
                    lastBbHeight = bBox.height;
                    node = node;
                }

            }
        }


    })

    let recalcLink = () => {
        node = node;
        let parentPosition = node.parent.position.clone().addXY(0, node.parent.height / 2);
        let childPosition = node.position.clone().addXY(0, node.height / 2);

        let diff = childPosition.clone().sub(parentPosition);

        // if(diff)
        let cos = diff.x / diff.length();

        let parentAngle = Vector.acos(cos);
        let childAngle = Math.PI + parentAngle;

        // console.log(parentAngle)
        if (diff.y < 0) {
            parentAngle = Math.PI * 2 - parentAngle;
        }
        //
        if (diff.y < 0) {
            childAngle = parentAngle - Math.PI;
        }


        let PI2 = 2*Math.PI;
        let step = PI2/RandomGenerator.vergesCount;

        let pathPosStart = node.parent.pathPoints[(parentAngle - parentAngle%step).toPrecision(5)];
        let pathPosEnd = node.pathPoints[(childAngle - childAngle%step).toPrecision(5)];

        let startPos = new Vector();
        let endPos = new Vector();


        if(pathPosStart ) {
            startPos = new Vector(pathPosStart.x, pathPosStart.y);
        }
        if(pathPosEnd){
            endPos = new Vector(pathPosEnd.x, pathPosEnd.y);
        }

        link = {
            parent: startPos.add(node.parent.position).addXY(0, node.parent.height / 2),
            child: endPos.add(node.position).addXY(0, node.height / 2)
        }

    }

    afterUpdate(() => {

        node = node;

        if (node.textElement && node.needRecalcLink) {
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

<g transform="translate({node.position.x},{node.position.y})">

    <g class="colorWhite">
        <path bind:this={node.pathElement} id="border{node.id}"
              transform="translate(0, {height/2})" d="{node.borderPath}" stroke="black"
              fill="currentColor" stroke-width="{node.selected ? 4 : 2}"/>
    </g>
    <g bind:this={node.textElement}>
        <text class="unselectable alexander" text-anchor="middle" font-size="20">
        </text>
    </g>

    <g class="colorTransparent">
        <use xlink:href="#border{node.id}" fill="transparent" on:mousedown={()=>onSelect(node) }
             on:dblclick={() => {edit = !edit; }}/>
    </g>

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
    .colorWhite{
        color: white;
    }

    .colorTransparent{
        color: transparent;
    }
</style>