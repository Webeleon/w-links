<div class="app">
		<img src="/logo-webeleon.png" alt="logo webeleon" />
		<h1>W links</h1>
		<h2>a link manager for social media respecting users privacy</h2>
		<p>private alpha, you can contact <a href="mailto:julien@webeleon.dev">julien@webeleon.dev</a> for a test account</p>
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
	}

	img {
		width: 8em;
		animation: spin 1s;
	}

	h1 {
		font-size: 2.5em;
	}

	a {
		color: #efefef;
		text-decoration: none;
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
