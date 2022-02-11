<script>
    import {afterUpdate} from "svelte";

    export let x;
    export let y;
    export let width = 0;
    export let height = 0;

    export let text = "";
    export let borderPath = "";
    export let textElement;

    afterUpdate(() => {
        if (textElement) {
            let bBox = textElement.getBBox();

            console.log(bBox);
            width = bBox.width + 2;
            height = bBox.height  + 4;
        }
    });
</script>

<g transform="translate({x},{y})">
    <g bind:this={textElement}  style="display: block">
        <text>
        <tspan y="1em">{text}adasda dasd ad asd fasfdsfs</tspan>
        <tspan x="0" dy="1em">{text} sldjhc l lask jldfakhja</tspan>
        <tspan x="0" dy="1em">{text} aslkjf lSKJDF ALS;KJ FA;LKSJF LKSJ</tspan>
        <tspan x="0" dy="1em">{text} LWUIE N;OQWJ F;ERH E;KQFGH EK</tspan>
        </text>
    </g>
    <circle r="10" fill="red" CX="0" CY="0" style="display: block"/>

    <path style="display: block" transform="translate({width/2}, {height/2})" d="{borderPath}" stroke="black" fill="transparent" stroke-width="2"/>

</g>

<style>
</style>