// src/routes/api/recipes/random/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import { SPOONACULAR_API_KEY } from '$env/static/private'; // Import private env var
import type { Recipe } from '$lib/types/types'; // Adjust the import path as necessary

export const GET: RequestHandler = async () => {
	if (!SPOONACULAR_API_KEY) {
		return new Response(JSON.stringify({ error: 'API key is missing' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	// You can add more query parameters here based on Spoonacular's API for more complex searches
	// e.g., cuisines, diet, intolerances, includeIngredients, etc.
	const tags = 'dinner'; // Example tag
	const number = 1; // Number of random recipes to fetch

	// Consider adding more parameters for variety: &instructionsRequired=true&addRecipeInformation=true for more details
	const apiUrl = `https://api.spoonacular.com/recipes/random?apiKey=${SPOONACULAR_API_KEY}&tags=${tags}&number=${number}&addRecipeInformation=true`;

	try {
		const response = await fetch(apiUrl);

		if (!response.ok) {
			let errorMessage = `Failed to fetch recipe: ${response.status} ${response.statusText}`;
			if (response.status === 402) {
				errorMessage = 'API quota exceeded. Please try again later.';
			} else {
				// Try to get more details from Spoonacular's response if possible
				try {
					const errorData = await response.json();
					if (errorData && errorData.message) {
						errorMessage = `Spoonacular API Error: ${errorData.message}`;
					}
				} catch (e) {
					/* Ignore if error response is not JSON */
				}
			}
			return new Response(JSON.stringify({ error: errorMessage }), {
				status: response.status,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		const data = await response.json();

		if (data.recipes && data.recipes.length > 0) {
			const recipe: Recipe = data.recipes[0]; // Assuming the structure matches your Recipe type
			return new Response(JSON.stringify(recipe), {
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			});
		} else {
			return new Response(JSON.stringify({ error: 'No recipes found from Spoonacular' }), {
				status: 404,
				headers: { 'Content-Type': 'application/json' }
			});
		}
	} catch (err) {
		console.error('Error fetching recipe from Spoonacular:', err);
		let message = 'An unknown error occurred while fetching the recipe.';
		if (err instanceof Error) {
			message = err.message;
		}
		return new Response(JSON.stringify({ error: message }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
