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
		<div class="flex gap-2 ml-4">
			<a href="/" class="btn btn-sm variant-ghost">Home</a>
			<a href="/favorites" class="btn btn-sm variant-ghost">Favorites</a>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<LightSwitch />
	</svelte:fragment>
</AppBar>
