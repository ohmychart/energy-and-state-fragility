<script>
	import { base } from '$app/paths';
	import '$styles/global.css';
</script>

<svelte:head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Energy Resources & State Fragility</title>
	<meta
		name="description"
		content="Visualization of the world's oil and gas reserves in terms of vulnerability expressed through the Fragile State Index levels."
	/>

	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="author" content="ohmychart.com" />
	<link rel="apple-touch-icon" sizes="180x180" href="{base}/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="{base}/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="{base}/favicon-16x16.png" />
	<link rel="manifest" href="{base}/site.webmanifest" />
</svelte:head>

<slot />
