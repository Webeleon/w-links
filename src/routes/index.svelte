<div class="app">
	<header>
		<img src="/logo-webeleon.png" alt="logo webeleon" />
		<h1>Liens Webeleon</h1>
	</header>
	<section>
		<a href="https://discord.gg/EEFMdjM">
			<img src="/logo-discord.svg" alt="logo discord" />
			<span> Webeleon community discord</span>
		</a>
		<a href="https://www.youtube.com/channel/UC6aVAKlKBXJOdDF9Az9ADSA">
			<img src="/logo-youtube.svg" alt="logo youtube" />
			<span>Cours NestJS sur youtube</span>
		</a>
		<a href="https://twitch.tv/webeleon" class="">
			<img src="/logo-twitch.svg" alt="logo twitch" />
			<span>Live de programmation</span>
		</a>
		<a href="https://dev.to/webeleon">
			<img src="/logo-devto.svg" alt="logo dev.to" />
			<span>Blog technique</span>
		</a>
		<a href="https://github.com/webeleon" class="">
			<img src="/logo-github.svg" alt="logo github" />
			<span>Open source</span>
		</a>
		<a href="https://www.tiktok.com/@webeleon" class="">
			<img src="/logo-tiktok.svg" alt="logo tiktok" />
			<span>Vidéo courte</span>
		</a>
	</section>
</div>

<style lang="scss">
	@import '@webeleon/scss-toolkit/lib/responsive';
	.app {
		min-height: 100vh;
		min-width: 100vw;
		margin: 0;
		background-color: #1c2f41;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		padding: 2em 0.2em;
	}

	header {
		& > img {
			width: 8em;
			animation: spin 1s;
		}

		& > h1 {
			font-size: 2.5em;
			color: #efefef;
		}

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	section {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;

		& > a {
			min-height: 2.5em;
			width: 75vw;
			@include mobile-tablet {
				width: 90vw;
			}

			border: 2px solid #c482bf;
			border-radius: 8px;
			&:hover {
				box-shadow: 0 0 1em #c482bf;
			}

			margin: 0.5em;
			background-color: #82d7c4;
			height: 5em;
			font-size: 2em;
			@include mobile {
				font-size: 1.5em;
			}

			display: flex;
			text-decoration: none;

			& > img {
				max-width: 4em;
				margin-left: 1em;
			}

			& > span {
				flex: 3;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			animation: fadein 1s;
		}
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
