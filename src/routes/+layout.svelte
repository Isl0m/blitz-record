<script>
	import Header from './Header.svelte';
	import TailwindIndicator from './TailwindIndicator.svelte';
	import './styles.postcss';
</script>

<div class="flex flex-col min-h-[100vh]">
	<Header />

	<main class="flex flex-1 flex-col justify-center p-4 max-w-5xl mx-auto box-border">
		<slot />
	</main>

	<footer class="flex flex-col justify-center items-center sm:p-3 py-3 px-0">
		<p>&copy; BlitzRecord. All rights reserved.</p>
	</footer>
	<TailwindIndicator />
</div>
