<script lang="ts">
	import { Laptop2, Volume2 } from 'lucide-svelte';
	import { getMimeTypes, recorder } from '../recorder';
	import Card from '$components/ui/card/Card.svelte';
	import CardHeader from '$components/ui/card/CardHeader.svelte';
	import CardContent from '$components/ui/card/CardContent.svelte';
	import Button from '$components/ui/button/Button.svelte';
	import Checkbox from '$components/ui/checkbox/Checkbox.svelte';
	import Label from '$components/ui/label/Label.svelte';
	import Badge from '$components/ui/badge/Badge.svelte';
	import { goto } from '$app/navigation';

	const mimeTypes = getMimeTypes();
	let mimeType = mimeTypes[0];
	let audio = true;

	const toVideoType = (mimeType: string) => mimeType.split('/')[1];
	const handleStart = async () => {
		await recorder.prepare(mimeType, { video: true, audio });
		goto('/record');
	};
</script>

<svelte:head>
	<title>Record Settings | BlitzRecord</title>
	<meta name="description" content="Configure your record type" />
</svelte:head>

<section class="text-center">
	<div class="grid grid-cols-2 gap-4 mb-4 w-96">
		<Card>
			<CardHeader class="items-center">
				<Laptop2 size={80} strokeWidth={1.5} />
			</CardHeader>
			<CardContent class="flex justify-center items-center gap-2">
				<h4 class="text-xl font-semibold tracking-tight">Video</h4>
				{#if mimeTypes.length > 1}
					<select bind:value={mimeType}>
						{#each mimeTypes as mime}
							<option value={mime}>{toVideoType(mime)}</option>
						{/each}
					</select>
				{:else}
					<Badge>{toVideoType(mimeType)}</Badge>
				{/if}
			</CardContent>
		</Card>
		<Card on:click={() => (audio = !audio)} class="select-none cursor-pointer">
			<CardHeader class="items-center">
				<Volume2 size={80} strokeWidth={1.5} />
			</CardHeader>
			<CardContent class="flex justify-center items-center gap-2">
				<Label for="audio" class="text-xl font-semibold tracking-tight">Audio</Label>
				<Checkbox id="audio" checked={audio} />
			</CardContent>
		</Card>
	</div>

	<Button on:click={handleStart}>Start Record</Button>
</section>

<style lang="postcss">
	select {
		@apply bg-primary text-primary-foreground rounded-full px-2.5 py-0.5 text-sm font-semibold;
	}
</style>
