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

<style lang="scss">
	nav {
		height: 3em;
		background-color: #82d7c4;
		border-bottom: 1px solid #c482bf;
		padding: 0 1em;

		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
</style>
