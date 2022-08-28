<script>
	import { LEVELS, scaleColor } from '$utils/constants';
</script>

<div class="chart-legend">
	<p>
		The Fragile State Index aggregates 12 indicators from different categories such as cohesion,
		economic, political, social and cross-cutting, into a single score, which is then can be
		assigned to the following vulnerability levels:
	</p>
	<ul class="legend">
		{#each LEVELS as level}
			<li>
				<span class="level-col" style="background-color: {scaleColor(level)};" />
				<span>{level}</span>
			</li>
		{/each}
	</ul>
</div>

<style>
	.chart-legend {
		max-width: 600px;
		margin: 0 auto 9rem auto;
	}

	@media (max-width: 650px) {
		.chart-legend {
			margin: 0 1rem 9rem 1rem;
		}
	}

	.chart-legend p {
		font-size: 1.6rem;
		line-height: 1.5;
		margin-bottom: 2rem;
	}

	.legend {
		display: grid;
		grid-template-columns: auto;
		grid-template-rows: repeat(3, 1fr);
		grid-auto-flow: column;
		row-gap: 0.7rem;
		list-style-type: none;
		font-size: 1.4rem;
		text-transform: uppercase;
	}

	@media (max-width: 420px) {
		.legend {
			row-gap: 4px;
		}
	}

	.legend li {
		line-height: 1;
		display: flex;
		align-items: center;
	}

	.legend li:nth-child(-n + 2) {
		grid-column: 1;
	}

	.legend li:nth-child(n + 3) {
		grid-column: 2;
	}

	.legend li:nth-child(n + 6) {
		grid-column: 3;
	}

	.legend li:nth-child(n + 9) {
		grid-column: 4;
	}

	.level-col {
		display: inline-block;
		width: 1.4rem;
		height: 1.4rem;
		margin: 0 0.7rem;
	}
</style>
