<script lang="ts">
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import type { FavoriteRecipeInfo } from '$lib/types/types';

	const favorites: Writable<FavoriteRecipeInfo[]> = writable([]);
	const FAVORITES_STORAGE_KEY = 'dinderV2Favorites';

	function loadFavorites() {
		if (typeof localStorage !== 'undefined') {
			const savedRecipes = JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) || '[]');
			favorites.set(savedRecipes);
		}
	}

	onMount(() => {
		loadFavorites();
	});

	function removeRecipe(recipeId: number) {
		favorites.update((currentFavorites) => {
			const updatedFavorites = currentFavorites.filter((recipe) => recipe.id !== recipeId);
			if (typeof localStorage !== 'undefined') {
				localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updatedFavorites));
			}
			return updatedFavorites;
		});
	}
</script>

<div class="container mx-auto p-4 sm:p-6 lg:p-8">
	<h1 class="mb-8 text-center text-4xl font-bold tracking-tight text-rose-500">
		Your Favorite Recipes
	</h1>

	{#if $favorites.length > 0}
		<ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each $favorites as recipe (recipe.id)}
				<li
					class="flex flex-col overflow-hidden rounded-xl bg-slate-800 shadow-lg transition-shadow duration-300 hover:shadow-rose-500/30"
				>
					{#if recipe.image}
						<img src={recipe.image} alt={recipe.title} class="h-48 w-full object-cover" />
					{:else}
						<div class="flex h-48 w-full items-center justify-center bg-slate-700 text-slate-500">
							No Image
						</div>
					{/if}
					<div class="flex flex-grow flex-col p-5">
						<h2 class="mb-2 min-h-[3em] flex-grow text-xl font-semibold text-slate-100">
							{recipe.title}
						</h2>
						<div class="mt-auto flex gap-3 pt-3">
							<a
								href={recipe.sourceUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="flex-1 rounded-md bg-sky-600 px-4 py-2 text-center text-sm font-medium text-white shadow-sm transition-colors duration-150 hover:bg-sky-700"
							>
								View Recipe
							</a>
							<button
								on:click={() => removeRecipe(recipe.id)}
								class="flex-1 rounded-md bg-red-600 px-4 py-2 text-center text-sm font-medium text-white shadow-sm transition-colors duration-150 hover:bg-red-700"
							>
								Remove
							</button>
						</div>
					</div>
				</li>
			{/each}
		</ul>
	{:else}
		<div class="py-12 text-center">
			<svg
				class="mx-auto h-12 w-12 text-slate-600"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				aria-hidden="true"
			>
				<path
					vector-effect="non-scaling-stroke"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M9.172 16.172a4 4 0 015.656 0L10 10.343l-4.828 4.829a4 4 0 000 5.656L10 17.657l6.828-6.829a4 4 0 00-5.656-5.656L10 6.343 8.828 5.172a4 4 0 00-5.656 0L10 10.343"
				/>
			</svg>
			<h3 class="mt-2 text-xl font-medium text-slate-300">No Favorites Yet</h3>
			<p class="mt-1 text-sm text-slate-500">
				Start discovering and like some recipes to see them here!
			</p>
			<div class="mt-6">
				<a
					href="/"
					class="inline-flex items-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-slate-900 focus:outline-none"
				>
					<svg
						class="mr-2 -ml-1 h-5 w-5"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
							clip-rule="evenodd"
						/>
					</svg>
					Find Recipes
				</a>
			</div>
		</div>
	{/if}
</div>
