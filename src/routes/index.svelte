<script>
	import Header from '$components/Header.svelte';
	import Chart from '$components/Chart.svelte';
	import Footer from '$components/Footer.svelte';

	import dataset from '$data/dataset.json';

	const dataOil = dataset
		.filter((d) => d.Var === 'oilreserves_bbl')
		.map((d) => {
			return { country: d.Country, share: d.Share, label: d.FSILabel, level: d.FSILevel };
		});

	const dataGas = dataset
		.filter((d) => d.Var === 'gasreserves_tcm')
		.map((d) => {
			return { country: d.Country, share: d.Share, label: d.FSILabel, level: d.FSILevel };
		});
</script>

<Header />
<Chart data={dataOil} title = {`Oil Reserves \n& Fragile State Index`}/>
<Chart data={dataGas} title = {`Natural Gas Reserves \n& Fragile State Index`}/>
<Footer />
