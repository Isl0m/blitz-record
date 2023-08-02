<script lang="ts">
	export let timeout: number = 3;
	export let onComplete: () => void;

	const intervalId = setInterval(() => (timeout -= 1), 1000);
	$: {
		if (timeout === 0) {
			clearInterval(intervalId);
			if (onComplete) {
				onComplete();
			}
		}
	}
</script>

{#if timeout > 0}
	<div class="fixed top-0 left-0 flex items-center justify-center h-full w-full bg-background/70">
		<span
			class="bg-red-500 inline-flex items-center justify-center w-52 h-52 rounded-full text-white text-9xl"
			>{timeout}</span
		>
	</div>
{/if}
