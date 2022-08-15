<script>
	export let annotation;
    export let color = "#fafafa"

	const arrowSize = 4;
	const arrowAngle = 90;

	const ex = 0;
	$: ey = annotation.size;
	$: sx = ex + annotation.size;
	$: sy = ey - annotation.size;
	$: c1x = ex + 0.5*annotation.size;
	$: c1y = sy;
	$: c2x = ex;
	$: c2y = ey - 0.5*annotation.size;
</script>

	<path
		d={`M ${sx} ${sy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${ex} ${ey}`}
		fill="none"
        stroke={color}
		class="annotation-curve"
	/>
	<polygon
		points={`0,${-arrowSize} ${arrowSize * 2},0, 0,${arrowSize}`}
		transform={`translate(${ex}, ${ey}) rotate(${arrowAngle})`}
		class="annotation-arrow"
        stroke="none"
        fill={color}
	/>
	<text x={sx} y={sy} class="annotation-label" stroke="none" fill={color}>{annotation.label}</text>

<style>
	.annotation-label {
		font-family: 'Caveat', cursive;
		font-size: 2.4rem;
		alignment-baseline: middle;
		transform: translateX(4px);
	}

	.annotation-curve {
		stroke-width: 2px;
	}
</style>
