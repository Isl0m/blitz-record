<script lang="ts">
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	import {
		downloadRecord,
		getMimeTypes,
		pauseRecord,
		startRecord,
		stopRecord,
		time,
		videoUrl
	} from './recorder';
	let mimeType = getMimeTypes()[0];
	const formatTime = (time: number) =>
		Intl.DateTimeFormat('en', {
			minute: '2-digit',
			second: '2-digit'
		}).format(time * 1000);
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture>
		</span>

		to your new<br />SvelteKit app
	</h1>

	<h2>
		try editing <strong>src/routes/+page.svelte</strong>
	</h2>

	<button on:click={() => startRecord(mimeType)}>Start Record</button>
	<button on:click={stopRecord}>Stop Record</button>
	<button on:click={pauseRecord}>Pause Record</button>
	<button on:click={downloadRecord}>Download Record</button>

	{#if getMimeTypes().length > 1}
		<select bind:value={mimeType}>
			{#each getMimeTypes() as mimeType}
				<option>{mimeType}</option>
			{/each}
		</select>
	{/if}

	{#if $videoUrl}
		<!-- svelte-ignore a11y-media-has-caption -->
		<video width={800} height={500} controls>
			<source src={$videoUrl} type={mimeType} />
		</video>
	{/if}

	<h1>
		{formatTime($time)}
	</h1>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
