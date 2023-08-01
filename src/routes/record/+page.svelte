<script lang="ts">
	import Button from '$components/ui/button/Button.svelte';
	import Card from '$components/ui/card/Card.svelte';
	import CardHeader from '$components/ui/card/CardHeader.svelte';
	import CardTitle from '$components/ui/card/CardTitle.svelte';
	import { Download, Pause, Play, RotateCcw, Square } from 'lucide-svelte';
	import {
		resetRecord,
		pauseRecord,
		startRecord,
		stopRecord,
		time,
		videoUrl,
		getFileName
	} from './recorder';
	import CardContent from '$components/ui/card/CardContent.svelte';

	const formatTime = (time: number) =>
		Intl.DateTimeFormat('en', {
			minute: '2-digit',
			second: '2-digit',
			hour12: false
		}).format(time * 1000);

	let isPlay = true;
	const handlePause = () => {
		isPlay = !isPlay;
		pauseRecord();
	};
	startRecord();
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="flex items-center gap-8">
	{#if $videoUrl}
		<div>
			<!-- svelte-ignore a11y-media-has-caption -->
			<video src={$videoUrl} width="800" height="500" controls />
			<div class="mt-4 space-x-4">
				<Button href={$videoUrl} download={getFileName()}
					><Download class="mr-2 h-4 w-4" />Download</Button
				>
				<Button href="/record/options"><RotateCcw class="mr-2 h-4 w-4" /> Record Again</Button>
			</div>
		</div>
	{/if}

	<Card class="text-center">
		<CardHeader>
			<CardTitle tag="h2" class="text-7xl">{formatTime($time)}</CardTitle>
		</CardHeader>
		<CardContent class="space-x-4">
			<Button on:click={handlePause}>
				{#if isPlay}
					<Play strokeWidth={1.5} />
				{:else}
					<Pause strokeWidth={1.5} />
				{/if}
			</Button>
			<Button on:click={stopRecord}><Square strokeWidth={1.5} /></Button>
		</CardContent>
	</Card>
</section>
