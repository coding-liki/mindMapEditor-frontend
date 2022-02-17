<script>
    export let link;
    export let zoom = 1;
</script>
<g >
    <line  x1="{link.parent.x}" y1="{link.parent.y}" x2="{link.child.x*zoom}" y2="{link.child.y}" stroke="#000"
          stroke-width="8"/>
    <circle r="3" fill="red" cx="0" cy="0"/>
</g>