<script lang="ts">
	import { onMount } from 'svelte';
	import { writable, type Writable, get } from 'svelte/store'; // Import 'get'
	import type { Recipe, FavoriteRecipeInfo } from '$lib/types/types';

	import RecipeCard from '$lib/components/RecipeCard.svelte';
	import ActionButtons from '$lib/components/ActionButtons.svelte';
	import ErrorDisplay from '$lib/components/ErrorDisplay.svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';

	const currentRecipe: Writable<Recipe | null> = writable(null);
	const error: Writable<string | null> = writable(null);
	const isLoading: Writable<boolean> = writable(false); // Start as false, set to true only during active fetch
	const isFavorited: Writable<boolean> = writable(false);

	const FAVORITES_STORAGE_KEY = 'dinderV2Favorites';

	function getSavedFavorites(): FavoriteRecipeInfo[] {
		if (typeof localStorage !== 'undefined') {
			return JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) || '[]');
		}
		return [];
	}

	function checkIfFavorited(recipeId: number | undefined): boolean {
		if (recipeId === undefined) return false;
		const savedRecipes = getSavedFavorites();
		return savedRecipes.some((r) => r.id === recipeId);
	}

	async function fetchNewRecipe() {
		isLoading.set(true);
		error.set(null);
		// We don't set currentRecipe to null here immediately if we want the old one to show while loading
		// However, for a "new recipe" action, it might feel better to clear it or show a distinct loading state.
		// Let's clear it for now to make the loading state more obvious for a *new* fetch.
		// If you prefer keeping the old one visible, remove the line below.
		currentRecipe.set(null);

		try {
			const response = await fetch('/api/recipes/random');
			if (!response.ok) {
				const errorData = await response
					.json()
					.catch(() => ({ error: `HTTP error: ${response.status}` }));
				throw new Error(errorData.error || `Failed to fetch recipe: ${response.statusText}`);
			}
			const data: Recipe = await response.json();
			currentRecipe.set(data);
			isFavorited.set(checkIfFavorited(data?.id));
		} catch (err) {
			if (err instanceof Error) {
				error.set(err.message);
			} else {
				error.set('An unknown error occurred while fetching the recipe.');
			}
			currentRecipe.set(null); // Ensure recipe is cleared on error
		} finally {
			isLoading.set(false);
		}
	}

	function toggleCurrentFavorite() {
		const recipeValue = get(currentRecipe); // Use get() for one-time read if needed outside reactive context
		if (!recipeValue || recipeValue.id === undefined) return;

		const savedRecipes = getSavedFavorites();
		const recipeIndex = savedRecipes.findIndex((r) => r.id === recipeValue.id);

		if (recipeIndex > -1) {
			savedRecipes.splice(recipeIndex, 1);
			isFavorited.set(false);
		} else {
			const newFavorite: FavoriteRecipeInfo = {
				id: recipeValue.id,
				title: recipeValue.title,
				image: recipeValue.image,
				sourceUrl: recipeValue.sourceUrl || '#'
			};
			savedRecipes.push(newFavorite);
			isFavorited.set(true);
		}
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(savedRecipes));
		}
	}

	function handleLike() {
		toggleCurrentFavorite();
		// Fetch new recipe after liking/unliking, as per "until we press X or heart"
		fetchNewRecipe();
	}

	function handleDislike() {
		// If it was favorited, this action implies un-favoriting it.
		// However, toggleCurrentFavorite is not called here, so it only acts as "next".
		// If you want "dislike" to also remove from favorites if it was favorited, add that logic.
		// For now, it just fetches the next recipe.
		isFavorited.set(false); // Reset for the next recipe appearance
		fetchNewRecipe();
	}

	onMount(() => {
		// Only fetch a new recipe if one isn't already loaded in the current session
		// and there's no existing error that the user should address first.
		if (get(currentRecipe) === null && get(error) === null) {
			fetchNewRecipe();
		} else if (get(currentRecipe)) {
			// Recipe exists from previous state in this session, update its favorite status
			isFavorited.set(checkIfFavorited(get(currentRecipe)?.id));
			isLoading.set(false); // Ensure loading is false if displaying existing data
		} else {
			// An error exists, not loading, the error will be displayed
			isLoading.set(false);
		}
	});
</script>

<div
	class="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4 text-white"
>
	{#if $isLoading}
		<LoadingSpinner />
	{:else if $error}
		<ErrorDisplay message={$error} onRetry={fetchNewRecipe} />
	{:else if $currentRecipe}
		<div class="relative w-full max-w-md">
			<RecipeCard recipe={$currentRecipe} />
			<ActionButtons
				onLike={handleLike}
				onDislike={handleDislike}
				bind:isFavorited={$isFavorited}
				recipeUrl={$currentRecipe.sourceUrl}
			/>
		</div>
	{:else}
		<div class="text-center">
			<p class="mb-4 text-xl text-slate-400">No recipe to show. Let's find one!</p>
			<button
				on:click={fetchNewRecipe}
				class="rounded-lg bg-rose-600 px-6 py-3 font-semibold text-white shadow-md transition-colors duration-150 hover:bg-rose-700"
			>
				Get a Recipe
			</button>
		</div>
	{/if}
</div>
