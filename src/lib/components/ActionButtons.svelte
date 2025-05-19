<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let onLike: () => void;
	export let onDislike: () => void;
	export let isFavorited: boolean;
	export let recipeUrl: string | undefined;

	const dispatch = createEventDispatcher();

	// Simple heart icons for now
	const heartOutline =
		'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z';
	const heartSolid =
		'M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z';
	const xMark = 'M6 18L18 6M6 6l12 12';
	const linkIcon =
		'M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244';

	function handleFavoriteClick() {
		// This will be for actual favoriting logic later
		// For now, it's handled by onLike
		onLike();
	}
</script>

<div class="mt-8 mb-4 flex items-center justify-around gap-4 px-4">
	<button
		on:click={onDislike}
		aria-label="Dislike Recipe"
		class="flex h-20 w-20 transform items-center justify-center rounded-full bg-slate-700 text-slate-400 shadow-lg transition-all duration-150 ease-in-out hover:scale-110 hover:bg-slate-600 hover:text-red-500"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-10 w-10"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="2"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d={xMark} />
		</svg>
	</button>

	{#if recipeUrl}
		<a
			href={recipeUrl}
			target="_blank"
			rel="noopener noreferrer"
			aria-label="View Full Recipe"
			class="flex h-16 w-16 transform items-center justify-center rounded-full bg-slate-700 text-slate-400 shadow-lg transition-all duration-150 ease-in-out hover:scale-110 hover:bg-slate-600 hover:text-sky-400"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-8 w-8"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d={linkIcon} />
			</svg>
		</a>
	{/if}

	<button
		on:click={handleFavoriteClick}
		aria-label={isFavorited ? 'Unfavorite Recipe' : 'Favorite Recipe'}
		class="flex h-20 w-20 transform items-center justify-center rounded-full bg-slate-700 shadow-lg transition-all duration-150 ease-in-out hover:scale-110 {isFavorited
			? 'text-rose-500 hover:text-rose-400'
			: 'text-slate-400 hover:text-rose-500'}"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-10 w-10"
			fill={isFavorited ? 'currentColor' : 'none'}
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="2"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d={isFavorited ? heartSolid : heartOutline}
			/>
		</svg>
	</button>
</div>
