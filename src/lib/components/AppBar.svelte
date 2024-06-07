<script lang="ts">
	import { AppBar, LightSwitch, getDrawerStore } from '@skeletonlabs/skeleton';

	// Initialize the drawer store
	const drawerStore = getDrawerStore();

	// Function to open the drawer
	function openDrawer() {
		drawerStore.open();
	}
</script>

<AppBar
	padding="py-4 pl-0 pr-5"
	gridColumns="grid-cols-3"
	slotDefault="place-self-center"
	slotTrail="place-content-end"
>
	<svelte:fragment slot="lead">
		<button type="button" class="btn" on:click={openDrawer}>
			<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7">
				<path d="M4 18L20 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
				<path d="M4 12L20 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
				<path d="M4 6L20 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
			</svg>
		</button>
	</svelte:fragment>
	<h1 class="font-bold pl-1 text-2xl">dinder</h1>
	<svelte:fragment slot="trail">
		<LightSwitch />
	</svelte:fragment>
</AppBar>
