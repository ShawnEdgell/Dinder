<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	interface SavedRecipe {
		title: string;
		url: string;
	}

	const favorites = writable<SavedRecipe[]>([]);

	onMount(() => {
		const savedRecipes = JSON.parse(localStorage.getItem('favorites') || '[]');
		favorites.set(savedRecipes);
	});

	function removeRecipe(url: string) {
		favorites.update((currentFavorites) => {
			const updatedFavorites = currentFavorites.filter((recipe) => recipe.url !== url);
			localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
			return updatedFavorites;
		});
	}
</script>

<div class="space-y-5 w-full h-full flex flex-col items-center">
	<h1 class="text-3xl sm:text-4xl mb-4">Favorites</h1>
	{#if $favorites.length > 0}
		<ul class="w-full max-w-2xl">
			{#each $favorites as { title, url }}
				<li class="mb-4 p-4 border rounded-xl flex justify-between items-center">
					<div class="text-lg font-semibold mr-2">{title}</div>
					<div class="flex flex-col space-y-2">
						<a
							href={url}
							target="_blank"
							rel="noopener noreferrer"
							class="btn variant-filled-primary"
						>
							Recipe
						</a>
						<button class="btn variant-filled-error" on:click={() => removeRecipe(url)}>
							Delete
						</button>
					</div>
				</li>
			{/each}
		</ul>
	{:else}
		<p class="text-lg">No favorites yet.</p>
	{/if}
</div>
