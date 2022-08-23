<script>
	export let size;
	export let label;
	export let color = '#fafafa';
	export let position = 'top';

	const arrowSize = 4;

	let ex, ey, sx, sy, c1x, c1y, c2x, c2y, arrowAngle;

	$: if (position === 'top') {
		ex = 0;
		ey = size;
		sx = ex + size;
		sy = ey - size;
		c1x = ex + 0.5 * size;
		c1y = sy;
		c2x = ex;
		c2y = ey - 0.5 * size;
		arrowAngle = 90;
	} else if (position === 'bottom') {
		ex = 0;
		ey = 0;
		sx = ex + size;
		sy = ey + size;
		c1x = ex + 0.5 * size;
		c1y = sy;
		c2x = ex;
		c2y = ey + 0.5 * size;
		arrowAngle = -90;
	} else if (position === 'middle') {
		ex = 0;
		ey = 0;
		sx = ex + size;
		sy = ey;
		c1x = sx;
		c1y = sy;
		c2x = ex;
		c2y = ey;
		arrowAngle = 180;
	}
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
<text x={sx} y={sy} class="annotation-label" stroke="none" fill={color}>{label}</text>

<style>
	.annotation-label {
		font-family: 'Caveat', cursive;
		font-size: 2.4rem;
		alignment-baseline: middle;
		transform: translateX(4px);
	}

	@media (max-width: 800px) {
		.annotation-label {
			font-size: 2rem;
		}
	}

	.annotation-curve {
		stroke-width: 2px;
	}
</style>
