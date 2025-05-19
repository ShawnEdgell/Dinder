<script lang="ts">
	import '../app.css'; // Your Tailwind base styles
	// Removed: import { page } from '$app/stores'; // Not used in this minimal layout
</script>

<div
	class="flex min-h-screen flex-col bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100"
>
	<header class="sticky top-0 z-50 bg-slate-800/80 p-4 shadow-md backdrop-blur-md">
		<nav class="container mx-auto flex items-center justify-between">
			<a href="/" class="text-2xl font-bold text-rose-500 transition-colors hover:text-rose-400"
				>Dinder</a
			>
			<div class="space-x-2">
				<a
					href="/"
					class="rounded-md px-3 py-2 text-sm transition-colors hover:bg-slate-700 sm:text-base"
					>Discover</a
				>
				<a
					href="/favorites"
					class="rounded-md px-3 py-2 text-sm transition-colors hover:bg-slate-700 sm:text-base"
					>Favorites</a
				>
			</div>
		</nav>
	</header>

	<main class="flex-grow"><slot /></main>

	<footer class="mt-auto border-t border-slate-700 p-4 text-center text-sm text-slate-500">
		Dinder &copy; {new Date().getFullYear()}
	</footer>
</div>
