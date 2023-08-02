<script>
	import Button from '$components/ui/button/Button.svelte';
</script>

<svelte:head>
	<title>BlitzRecord</title>
	<meta name="description" content="BlitzRecord is app for fast creating screen record" />
</svelte:head>

<section class="text-center">
	<div class="mb-8">
		<h1 class="text-5xl font-semibold">Free Online Screen Recorder</h1>
		<span>Just with one click, you can start capturing your screen effortlessly.</span>
	</div>
	<Button>
		<a href="/record/options">Start Recording</a>
	</Button>
</section>
