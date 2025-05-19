<script lang="ts">
	import type { Recipe } from '$lib/types/types'; // Adjust path as needed
	export let recipe: Recipe;

	// Basic HTML sanitizer or use a library if summary/instructions are complex
	function sanitizeHTML(htmlString: string | undefined): string {
		if (!htmlString) return '';
		// THIS IS A VERY BASIC SANITIZER. For production, use a robust library like DOMPurify.
		const temp = document.createElement('div');
		temp.innerHTML = htmlString;
		// Remove script and style tags for basic safety
		temp.querySelectorAll('script, style').forEach((el) => el.remove());
		return temp.innerHTML;
	}
</script>

<div
	class="transform overflow-hidden rounded-2xl bg-slate-800 shadow-2xl transition-all duration-300 ease-in-out hover:scale-[1.02]"
>
	{#if recipe.image}
		<img src={recipe.image} alt={recipe.title} class="h-64 w-full object-cover" />
	{/if}
	<div class="p-6">
		<h2 class="mb-3 text-3xl font-bold tracking-tight text-rose-400">{recipe.title}</h2>

		{#if recipe.summary}
			<div class="prose prose-sm prose-invert mb-4 line-clamp-4 max-w-none text-slate-300">
				{@html sanitizeHTML(recipe.summary)}
			</div>
		{/if}

		<div class="mb-4 flex flex-wrap gap-2 text-xs">
			{#if recipe.readyInMinutes}
				<span class="rounded-full bg-slate-700 px-2 py-1 text-rose-300">
					Ready in: {recipe.readyInMinutes} mins
				</span>
			{/if}
			{#if recipe.servings}
				<span class="rounded-full bg-slate-700 px-2 py-1 text-rose-300">
					Serves: {recipe.servings}
				</span>
			{/if}
		</div>
	</div>
</div>
