<script>
	import { base } from '$app/paths';

	const srcCover = `${base}/header-cover.png`;
</script>

<header>
	<!-- <div class="cover" style="background-image: url({srcCover});" /> -->
	<img src={srcCover} alt="Header cover" />
	<div class="title-container">
		<h1 class="title">Energy Resources & State Fragility</h1>
	</div>
	<div class="intro">
		<p>
			Almost <strong>half of the world's proven fossil energy reserves</strong> like oil and gas is
			held by countries classified in the <strong>warning</strong> category of the Fragile State Index,
			which measures a state’s vulnerability to collapse or conflict.
		</p>


	</div>
</header>

<style>
	header {
		max-width: 1200px;
		line-height: 0;
		margin: 0 auto 3rem auto;
	}

	img {
		width: 100%;
		height: auto;
		filter: drop-shadow(12px 12px 0 var(--color-accent));
		margin-bottom: 24px;
	}

	.title-container {
		margin-top: 1rem;
		background-color: var(--color-secondary);
		padding: 1.5rem 3rem;
		box-shadow: 12px 12px 0px 0px var(--color-accent);
		width: 65%;
		margin: 0 auto;
		margin-bottom: 9rem;
	}

	.title {
		color: var(--color-primary-light);
		margin-bottom: 0;
		line-height: 1;
		text-align: center;
	}

	.intro {
		line-height: 1.75;
		max-width: 600px;
		margin: 0 auto;
	}

	@media (max-width: 650px) {
		.intro {
			margin: 0 1rem;
		}
	}

	.intro p {
		margin-bottom: 3rem;
	}
</style>
