<script>
	import { logout } from '../stores/auth.store';
	import { authStore } from '../stores/auth.store';

	let loggedIn;
	authStore.subscribe((auth) => {
		loggedIn = auth.loggedIn;
	});
</script>

{#if loggedIn}
	<nav>
		<span>
			<a href="/profile">
				<button>
					Profile
				</button>
			</a>
			<a href="/links">
				<button>
					Links
				</button>
			</a>
			<a href="/theme">
				<button>
					Theme
				</button>
			</a>
		</span>
		<button on:click={logout}>logout</button>
	</nav>
{/if}

<style lang="scss">
	nav {
		height: 3em;
		background-color: #82d7c4;
		border-bottom: 1px solid #c482bf;
		padding: 0 1em;

		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	button {
		padding: 0.5em 1em;
		border: none;
		cursor: pointer;

		&:hover {
			box-shadow: 0 0.5em 0.2em #c482bf;
		}
	}

	a {
		color: #1c2f41;
		text-decoration: none;
	}
</style>
