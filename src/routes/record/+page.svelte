<script lang="ts">
	import Button from '$components/ui/button/Button.svelte';
	import Card from '$components/ui/card/Card.svelte';
	import CardHeader from '$components/ui/card/CardHeader.svelte';
	import CardTitle from '$components/ui/card/CardTitle.svelte';
	import { Download, Pause, Play, RotateCcw, Square } from 'lucide-svelte';
	import { time, videoUrl, recorder, isReady } from './recorder';
	import CardContent from '$components/ui/card/CardContent.svelte';
	import { beforeNavigate, goto } from '$app/navigation';
	import Countdown from './Countdown.svelte';

	let isPlay = true;

	$: {
		if ($isReady === false) {
			goto('/record/options');
		}
	}

	const formatTime = (time: number) =>
		Intl.DateTimeFormat('en', {
			minute: '2-digit',
			second: '2-digit',
			hour12: false
		}).format(time * 1000);

	const handlePause = () => {
		isPlay = !isPlay;
		recorder.pause();
	};
	beforeNavigate(() => {
		recorder.reset($videoUrl);
	});
</script>

<svelte:head>
	<title>Record | BlitzRecord</title>
</svelte:head>

<section class="flex items-center gap-8">
	{#if $videoUrl}
		<div>
			<!-- svelte-ignore a11y-media-has-caption -->
			<video src={$videoUrl} width="800" height="500" controls />
			<div class="mt-4 space-x-4">
				<Button href={$videoUrl} download={recorder.getFileName()}
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
			<Button on:click={recorder.stop}><Square strokeWidth={1.5} /></Button>
		</CardContent>
	</Card>
</section>

<Countdown onComplete={recorder.start} />
