<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import type { Recipe } from '../types';
	import Hammer from 'hammerjs';

	const recipe = writable<Recipe | null>(null);

	async function fetchRecipe() {
		try {
			const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
			const apiUrl = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&tags=dinner`;
			console.log('API URL:', apiUrl); // Log the API URL for debugging

			const response = await fetch(apiUrl);

			if (!response.ok) {
				throw new Error(`Failed to fetch recipe: ${response.statusText}`);
			}

			const data = await response.json();
			console.log('API Response:', data); // Log the API response for debugging

			if (data.recipes && data.recipes.length > 0) {
				recipe.set(data.recipes[0]);
			} else {
				throw new Error('No recipes found');
			}
		} catch (error) {
			console.error('Error fetching recipe:', error);
		}
	}

	function saveRecipe() {
		recipe.subscribe((currentRecipe) => {
			if (currentRecipe) {
				const savedRecipes = JSON.parse(localStorage.getItem('favorites') || '[]');
				const newRecipe = {
					title: currentRecipe.title,
					url: currentRecipe.sourceUrl
				};
				savedRecipes.push(newRecipe);
				localStorage.setItem('favorites', JSON.stringify(savedRecipes));
				fetchRecipe(); // Fetch the next recipe after saving
			}
		})();
	}

	onMount(() => {
		fetchRecipe();

		const card = document.querySelector('.swipe-card') as HTMLElement;
		if (card) {
			const hammer = new Hammer(card);
			hammer.on('swipeleft swiperight', (event: HammerInput) => {
				fetchRecipe();
			});

			return () => {
				hammer.off('swipeleft swiperight');
			};
		}
	});

	onDestroy(() => {
		const card = document.querySelector('.swipe-card') as HTMLElement;
		if (card) {
			const hammer = new Hammer(card);
			hammer.off('swipeleft swiperight');
		}
	});
</script>

<div class="space-y-5 w-full flex flex-col items-center">
	{#if $recipe}
		<div class="card shadow-lg rounded-2xl mb-6 swipe-card">
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
					on:click={saveRecipe}
				>
					❤️
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
	.swipe-card {
		touch-action: pan-y;
	}

	.btn svg {
		width: 1.25rem; /* Adjust the size as needed */
		height: 1.25rem; /* Adjust the size as needed */
	}
</style>
