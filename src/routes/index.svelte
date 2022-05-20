<div class="app">
	<img class="logo" src="/logo-webeleon.png" alt="logo webeleon" />
	<h1>W links</h1>
	<h2>an open source link manager for social media respecting users privacy</h2>
	<p>
		private alpha, you can contact <a href="mailto:julien@webeleon.dev">julien@webeleon.dev</a> for a
		test account
	</p>
	<p>
		<a class="github-link" href="https://github.com/Webeleon/w-links-api">
			<img src="/logo-github.svg" alt="github logo" />
			NestJS api
		</a>

		<a class="github-link" href="https://github.com/Webeleon/w-links">
			<img src="/logo-github.svg" alt="github logo" />
			Svelte front
		</a>
	</p>
</div>

<style lang="scss">
	.app {
		min-height: 100vh;
		margin: 0;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		color: #efefef;
		padding: 2em;
	}

	.logo {
		width: 8em;
		animation: spin 1s;
	}

	h1 {
		font-size: 2.5em;
	}

	h2 {
		text-align: center;
	}
	p {
		text-align: center;
	}

	a {
		color: #efefef;
		text-decoration: none;
	}

	.github-link {
		aspect-ratio: 16 / 3;
		background-color: #82d7c4;
		color: #1c2f41;
		border-radius: 8px;
		padding: 1em;
		margin: 1em;
		min-width: 15em;

		& > img {
			height: 3em;
			animation: spin 1s;
		}

		display: flex;
		align-items: center;
		justify-content: space-evenly;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
