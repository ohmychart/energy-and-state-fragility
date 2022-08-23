<script>
	import { group } from 'd3-array';
	import { stack, stackOrderAscending } from 'd3-shape';
	import { scaleLinear, scaleBand } from 'd3-scale';
	import { scaleColor, LABELS } from '$utils/constants.js';
	import { fade, blur } from 'svelte/transition';

	import ChartAnnotation from '$components/ChartAnnotation.svelte';

	export let data;
	export let title = '';
	export let xAxisTitle = ['Share of world', 'reserves'];
	export let annotate = [];

	let width = 1200;
	$: height = width / 2.5;

	const margin = {
		top: 24,
		bottom: 24 * 3,
		left: 24 * 5,
		right: 0
	};

	$: w = width - margin.left - margin.right;
	$: h = height - margin.top - margin.bottom;

	$: scaleX = scaleLinear().range([0, w]).domain([0, 0.55]).nice();
	$: scaleY = scaleBand().range([0, h]).domain(LABELS).padding(0.1);

	const chartData = Array.from(
		group(data, (d) => d.label),
		([label, countries]) => {
			const shares = Object.assign(
				{},
				...countries.map((d) => ({ [d.country]: { share: d.share, level: d.level } }))
			);

			return {
				label,
				...shares
			};
		}
	);

	const countryKeys = new Set(data.map((d) => d.country));
	const stackedData = stack()
		.keys(countryKeys)
		.value((d, key) => d[key]?.share ?? 0)
		.order(stackOrderAscending)(chartData);

	$: ticksX = scaleX.ticks(5).map((tick) => {
		return {
			label: `${(tick * 100).toFixed(0)}%`,
			pos: scaleX(tick)
		};
	});

	$: ticksY = LABELS.map((label) => {
		return {
			label: label,
			pos: scaleY(label) + scaleY.bandwidth() * 0.5
		};
	});

	$: xAxisTitleMargin = width > 800 ? 48 : 48 * 0.8;
	$: xAxisTitleGap = width > 800 ? 18 : 18 * 0.8;
	$: isMobileView = width < 500;

	let annotations = [];
	let annotation = {};
	let isAnnotated = false;

	// Permanent annotations
	stackedData.forEach((countryData) => {
		if (annotate.includes(countryData.key)) {
			countryData.forEach((labelData) => {
				if (labelData[1] - labelData[0] > 0) {
					const value = (labelData[1] - labelData[0]) * 100;
					const label = `${countryData.key} ${value.toFixed(0)}%`;
					const y = labelData.data.label;
					const x1 = labelData[1];
					const x0 = labelData[0];

					annotations.push({
						value,
						label,
						y,
						x0,
						x1
					});
				}
			});
		}
	});

	const annotationPos = (valY, valX0, valX1, scaleX, scaleY, h) => {
		let pX = scaleX(valX0) + 0.5 * scaleX(valX1 - valX0);
		const y = scaleY(valY);
		let pY = y - scaleY.bandwidth() * 0.5 - 6;
		let pos = 'top';

		if (y > 0.75 * h || y < 0.25 * h) {
			pos = 'middle';
			pY = y + scaleY.bandwidth() * 0.5;
			pX = scaleX(valX1) + 10;
		} else if (y > 0.5 * h) {
			pos = 'bottom';
			pY = y + scaleY.bandwidth() + 10;
		}

		return { pX, pY, pos };
	};

	$: showAnnotation = (countryData, labelData) => {
		const value = (labelData[1] - labelData[0]) * 100;
		const label = value >= 1 ? `${countryData.key} ${value.toFixed(0)}%` : `${countryData.key} <1%`;

		const { pX, pY, pos } = annotationPos(
			labelData.data.label,
			labelData[0],
			labelData[1],
			scaleX,
			scaleY,
			h
		);

		annotation = {
			pX,
			pY,
			pos,
			label,
			size: h * 0.1
		};

		isAnnotated = true;
	};

	const hideAnnotation = () => {
		isAnnotated = false;
	};
</script>

<div class="chart-container" bind:clientWidth={width}>
	<div class="title-container">
		<h2 class="title">{title}</h2>
	</div>

	<svg {width} {height}>
		<g class="bars" transform="translate({margin.left}, {margin.top})">
			{#each stackedData as countryData}
				{#each countryData as labelData}
					{#if labelData[1] - labelData[0] > 0}
						<rect
							x={scaleX(labelData[0])}
							y={scaleY(labelData.data.label)}
							width={scaleX(labelData[1] - labelData[0])}
							height={scaleY.bandwidth()}
							style:fill={scaleColor(labelData.data[countryData.key].level)}
							on:mouseenter={(e) => showAnnotation(countryData, labelData)}
							on:mouseleave={(e) => hideAnnotation()}
							class="bar"
						/>
					{/if}
				{/each}
			{/each}

			{#each annotations as annotation}
				{#if !isAnnotated}
					{@const size = h * 0.1}
					{@const { pX, pY, pos } = annotationPos(
						annotation.y,
						annotation.x0,
						annotation.x1,
						scaleX,
						scaleY,
						h
					)}
					<g transform="translate({pX}, {pY})" class="annotation-default" transition:fade>
						<ChartAnnotation {size} label={annotation.label} position={pos} color="#80CBC4" />
					</g>
				{/if}
			{/each}

			{#if isAnnotated}
				<g transform="translate({annotation.pX}, {annotation.pY})" class="annotation" in:fade>
					<ChartAnnotation
						size={annotation.size}
						label={annotation.label}
						position={annotation.pos}
						color="#80CBC4"
					/>
				</g>
			{/if}
		</g>

		<g class="axis-y" transform="translate({margin.left}, {margin.top})">
			{#each ticksY as tick}
				<g class="tick" transform="translate(0, {tick.pos})">
					<text x="0" y="0" class="tick-y" alignment-baseline="middle">{tick.label}</text>
				</g>
			{/each}
		</g>

		<g class="axis-x" transform="translate({margin.left}, {margin.top + h + 8})">
			{#if !isMobileView}
				<g class="axis-title" transform="translate({scaleX(0.5)}, {-xAxisTitleMargin})">
					<text>
						{#each xAxisTitle as title}
							<tspan x="0" dy={xAxisTitleGap}>{title}</tspan>
						{/each}
					</text>
				</g>
			{/if}

			<line x1="0" y1="0" x2={ticksX.slice(-1)[0].pos} y2="0" class="axis-domain" />
			{#each ticksX as tick}
				<g class="tick" transform="translate({tick.pos}, 0)">
					<line x1="0" y1="0" x2="0" y2="8" />
					<text x="0" y="0" class="tick-x">{tick.label}</text>
				</g>
			{/each}

			{#if isMobileView}
				<g class="axis-title-mobile" transform="translate({w * 0.5}, {1.4 * xAxisTitleMargin})">
					<text>{xAxisTitle.join(' ')}</text>
				</g>
			{/if}
		</g>
	</svg>
</div>

<style>
	.chart-container {
		max-width: 1200px;
		margin: 0 auto 9rem auto;
	}

	@media (max-width: 1250px) {
		.chart-container {
			margin: 0 1rem 9rem 1rem;
		}
	}

	.title-container {
		display: inline-block;
		max-width: 388px;
		border: 3px solid var(--color-dark);
		padding: 12px 24px;
		box-shadow: 12px 12px 0px 0px var(--color-primary-dark);
		margin-bottom: 3rem;
	}

	.title {
		margin: 0;
		line-height: 1;
		text-align: center;
		text-align: left;
		white-space: pre-line;
	}

	.tick {
		fill: var(--color-secondary);
	}

	.tick line {
		stroke: var(--color-secondary);
		stroke-width: 2px;
		stroke-linecap: round;
	}

	.tick-y {
		font-size: 14px;
		font-weight: 600;
		text-anchor: end;
		transform: translateX(-12px);
	}

	.tick-x {
		font-size: 14px;
		font-weight: 400;
		text-anchor: middle;
		transform: translate(0, 30px);
	}

	.axis-domain {
		stroke: var(--color-secondary);
		stroke-width: 2px;
	}

	.axis-title text {
		font-size: 14px;
		font-weight: 400;
		fill: var(--color-secondary);
		text-transform: uppercase;
		text-anchor: end;
	}

	.axis-title-mobile text {
		font-size: 12px;
		font-weight: 400;
		fill: var(--color-secondary);
		text-transform: uppercase;
		text-anchor: middle;
	}

	rect.bar {
		fill: grey;
		stroke: var(--color-primary-dark);
		stroke-width: 1px;
		/* cursor: pointer; */
	}

	@media (max-width: 800px) {
		.tick-y {
			font-size: 12px;
		}

		.tick-x {
			font-size: 12px;
		}

		.axis-title text {
			font-size: 12px;
		}
	}

	@media (max-width: 500px) {
		.annotation-default {
			display: none;
		}
	}
</style>
