<script lang="ts">
	export let message: string | null = 'An error occurred.';
	export let onRetry: (() => void) | undefined = undefined;
</script>

<div
	class="w-full max-w-md rounded-md border-l-4 border-red-500 bg-red-100 p-6 text-center text-red-700 shadow-md"
>
	<p class="mb-2 text-xl font-bold">Oops! Something went wrong.</p>
	<p class="text-md mb-4">{message}</p>
	{#if onRetry}
		<button
			on:click={onRetry}
			class="rounded-lg bg-red-500 px-6 py-2 font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-red-600"
		>
			Try Again
		</button>
	{/if}
</div>
