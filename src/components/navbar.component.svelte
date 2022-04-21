<script>
	import { logout } from '../stores/auth.store';
	import { authStore } from '../stores/auth.store';

	let loggedIn;
	authStore.subscribe((auth) => {
		loggedIn = auth.loggedIn;
	});
</script>

<nav>
	{#if loggedIn}
		<button on:click={logout}>logout</button>
	{/if}
</nav>
