<script>
    export let nodeView;
</script>

<g transform="translate({nodeView.node.position.x},{nodeView.node.position.y})">
    <g class="colorWhite">
<!--        <path bind:this={nodeView.pathElement} id="border{nodeView.id}"-->
<!--              transform="translate(0, {height/2})" d="{nodeView.borderPath}" stroke="black"-->
<!--              fill="currentColor" stroke-width="{nodeView.selected ? 4 : 2}"/>-->
    </g>
    <g bind:this={nodeView.textElement}>
        <text class="unselectable alexander" text-anchor="middle" font-size="20">
        </text>
    </g>
    <g class="colorTransparent">
<!--        <use xlink:href="#border{nodeView.id}" fill="transparent" on:mousedown={()=>onSelect(nodeView) }-->
<!--             on:dblclick={() => {edit = !edit; }}/>-->
    </g>
</g>

<style>
    .colorWhite{
        color: white;
    }

    .colorTransparent{
        color: transparent;
    }
</style>