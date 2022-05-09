<script context="module" lang="ts">
	import { getPublicUserLinks } from '../../requests/links';

	export async function load({ params }) {
		const links = await getPublicUserLinks(params.username);
		return {
			props: {
				links
			}
		};
	}
</script>

<script lang="ts">
	import { variables } from '../../variables';
	import { Link } from '../../dto/link.dto';
	const baseUrl = variables.apiUrl;
	export let links: Link[] = [];
</script>

<div class="app">
	<section>
		{#each links as link}
			<a href={`${baseUrl}/links/${link.uuid}`}>
				<img src="/logo-{link.type}.svg" alt="logo {link.type}" />
				<span>{link.displayName}</span>
			</a>
		{/each}
	</section>
</div>

<style lang="scss">
	@import '@webeleon/scss-toolkit/lib/responsive';
	.app {
		min-height: 100vh;
		min-width: 100vw;
		margin: 0;
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
