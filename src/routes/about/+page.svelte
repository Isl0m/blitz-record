<script>
	import { Zap } from 'lucide-svelte';
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="text-lg">
	<h1 class="mb-2 text-4xl font-extrabold tracking-tight lg:text-5xl">About this app</h1>

	<p>
		This app is designed for quick <Zap class="inline-block w-4 h-4 text-yellow-500" /> and easy screen
		recordings, completely free of charge.
	</p>

	<p>
		This app was created by <a
			class="text-blue-700 hover:underline underline-offset-4"
			href="https://github.com/dev_islom">@dev_islom</a
		>.
	</p>

	<p>
		This app is built using the <a
			class="text-blue-700 hover:underline underline-offset-4"
			href="https://kit.svelte.dev/">Svelte Kit</a
		> framework.
	</p>
</div>
