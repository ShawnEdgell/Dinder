<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import type { Recipe } from '../types';

	const recipe = writable<Recipe | null>(null);
	const error = writable<string | null>(null);
	const isFavorited = writable<boolean>(false);

	async function fetchRecipe() {
		try {
			const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
			if (!apiKey) {
				throw new Error('API key is missing');
			}
			const apiUrl = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&tags=dinner`;

			const response = await fetch(apiUrl);

			if (!response.ok) {
				if (response.status === 402) {
					// Assuming 402 is the status code for quota exceeded
					throw new Error('API quota exceeded. Please check back later.');
				}
				throw new Error(`Failed to fetch recipe: ${response.statusText}`);
			}

			const data = await response.json();

			if (data.recipes && data.recipes.length > 0) {
				const currentRecipe = data.recipes[0];
				recipe.set(currentRecipe);
				error.set(null);
				isFavorited.set(checkIfFavorited(currentRecipe));
			} else {
				throw new Error('No recipes found');
			}
		} catch (err) {
			if (err instanceof Error) {
				error.set(err.message);
			} else {
				error.set('An unknown error occurred');
			}
		}
	}

	function checkIfFavorited(currentRecipe: Recipe) {
		const savedRecipes = JSON.parse(localStorage.getItem('favorites') || '[]');
		return savedRecipes.some(
			(r: { title: string; url: string }) => r.url === currentRecipe.sourceUrl
		);
	}

	function toggleFavorite() {
		recipe.subscribe((currentRecipe) => {
			if (currentRecipe) {
				const savedRecipes = JSON.parse(localStorage.getItem('favorites') || '[]');
				const isAlreadyFavorited = savedRecipes.some(
					(r: { url: string }) => r.url === currentRecipe.sourceUrl
				);
				if (isAlreadyFavorited) {
					const updatedRecipes = savedRecipes.filter(
						(r: { url: string }) => r.url !== currentRecipe.sourceUrl
					);
					localStorage.setItem('favorites', JSON.stringify(updatedRecipes));
					isFavorited.set(false);
				} else {
					const newRecipe = {
						title: currentRecipe.title,
						url: currentRecipe.sourceUrl
					};
					savedRecipes.push(newRecipe);
					localStorage.setItem('favorites', JSON.stringify(savedRecipes));
					isFavorited.set(true);
				}
			}
		})();
	}

	onMount(() => {
		fetchRecipe();
	});
</script>

<div class="space-y-5 w-full flex flex-col items-center">
	{#if $error}
		<div class="text-red-500 text-center p-4">
			<p>{$error}</p>
		</div>
	{:else if $recipe}
		<div class="card shadow-lg rounded-2xl mb-6">
			<header class="card-header">
				<img src={$recipe.image} alt={$recipe.title} class="rounded-2xl w-full h-auto" />
			</header>
			<section class="p-4">
				<h2 class="h2 text-3xl sm:text-4xl mb-2">{$recipe.title}</h2>
			</section>
			<footer class="card-footer flex justify-center gap-2">
				<button
					type="button"
					class="btn btn-lg mb-2 font-bold variant-filled-primary"
					on:click={toggleFavorite}
				>
					{#if $isFavorited}
						❤️
					{:else}
						🤍
					{/if}
				</button>
				<a
					href={$recipe.sourceUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="btn btn-lg mb-2 font-bold variant-filled-primary flex items-center"
				>
					<span>View Recipe</span>
				</a>
			</footer>
		</div>
	{:else}
		<p>Loading...</p>
	{/if}
</div>
<div class="flex justify-center gap-2 space-6">
	<button
		type="button"
		class="btn btn-lg variant-filled flex items-center font-bold"
		on:click={fetchRecipe}
	>
		<span>Next</span>
		<svg class="ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M4 12H20M20 12L16 8M20 12L16 16"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</button>
</div>

<style>
	.btn svg {
		width: 1.25rem; /* Adjust the size as needed */
		height: 1.25rem; /* Adjust the size as needed */
	}
</style>
