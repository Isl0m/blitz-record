<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/logo.svg';
	import github from '$lib/images/github.svg';
	import { cn } from '$lib/utils';

	const navItems = [
		{
			href: '/',
			name: 'Home'
		},
		{
			href: '/record/options',
			name: 'Record'
		},
		{
			href: '/about',
			name: 'About'
		}
	];
</script>

<header class="flex justify-between items-center container">
	<a href="/" class="inline-flex items-center gap-2">
		<img src={logo} height={60} width={100} alt="BlitzRecord" class="mix-blend-luminosity" />
	</a>

	<nav class="inline-flex items-center gap-4 text-foreground/60">
		{#each navItems as { href, name }}
			<a
				{href}
				class={cn('hover:text-foreground/80', $page.url.pathname === href && 'text-foreground/80')}
			>
				{name}
			</a>
		{/each}
	</nav>

	<a href="https://github.com/Isl0m/blitz-record">
		<img src={github} width={36} height={36} alt="GitHub" />
	</a>
</header>
