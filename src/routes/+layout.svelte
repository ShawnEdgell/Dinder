<script lang="ts">
	import '../app.postcss';
	import AppBar from '$lib/components/AppBar.svelte';
	import { initializeStores, Drawer, getDrawerStore } from '@skeletonlabs/skeleton';

	initializeStores();

	// Initialize the drawer store
	const drawerStore = getDrawerStore();

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	function closeDrawer() {
		drawerStore.close();
	}
</script>

<Drawer rounded="none">
	<div class="w-full h-full flex flex-col justify-center items-center space-y-5">
		<p>Theres nothing here yet.</p>
		<button
			on:click={closeDrawer}
			type="button"
			class="btn variant-filled w-32"
			data-sveltekit-preload-data="hover">Close Drawer</button
		>
	</div>
</Drawer>

<div class="flex flex-col h-screen">
	<AppBar />
	<div class="flex-grow p-6 container mx-auto flex justify-center items-center">
		<slot />
	</div>
</div>
