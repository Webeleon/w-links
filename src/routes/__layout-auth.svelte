<script lang="ts">
	import { authStore, initAuthFromStorage } from '../stores/auth.store';
	import Login from '../components/login.component.svelte';
	import Notifications from '../components/notifications.conponent.svelte';
	import Navbar from '../components/navbar.component.svelte';
	import { onMount } from 'svelte';

	let loggedIn = true;
	authStore.subscribe((auth) => {
		loggedIn = auth.loggedIn;
	});

	onMount(() => {
		initAuthFromStorage();
	});
</script>

<div class="container">
	<Notifications />
	{#if !loggedIn}
		<Login />
	{:else}
		<Navbar />
		<slot />
	{/if}
</div>

<style lang="scss">
	.container {
		min-height: 100vh;
	}
</style>
