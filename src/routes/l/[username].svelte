<script context="module" lang="ts">
	import { getPublicUserLinks } from '../../requests/links';
	import { getTheme } from '../../requests/theme';

	export async function load({ params }) {
		const links = await getPublicUserLinks(params.username);
		const theme = await getTheme(params.username)
		return {
			props: {
				links,
				theme
			}
		};
	}
</script>

<script lang="ts">
	import { variables } from '../../variables';
	import { Link } from '../../dto/link.dto';
	import { ThemeDto } from '../../dto/theme.dto';
	import { defaultTheme } from '../../themes/default.theme';
	import { cssVariables } from '../../use/cssVariables';

	const baseUrl = variables.apiUrl;
	export let links: Link[] = [];
	export let theme: ThemeDto = defaultTheme;
</script>

<div class="app" use:cssVariables={theme}>
	<section>
		{#each links as link}
			<a href={`${baseUrl}/links/${link.uuid}?r=${Date.now()}`}>
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
		background-color: var(--backgroundColor);
	}

	section {
		display: flex;
		flex-direction: column;

		& > a {
			min-height: 2.5em;
			width: 75vw;
			@include mobile-tablet {
				width: 90vw;
			}

			border: 2px solid var(--linkBorderColor);
			border-radius: 8px;
			&:hover {
				box-shadow: 0 0 1em var(--linkBorderColor);
			}

			margin: 0.5em;
			background-color: var(--linkBackgroundColor);
			height: 5em;
			font-size: 2em;
			color: var(--linkTextColor);
			@include mobile {
				font-size: 1.5em;
			}

			display: flex;
			align-items: center;
			justify-content: center;
			text-decoration: none;

			& > img {
				width: 4em;
				height: 4em;
				margin: 0 1em;
				animation: spin 1s;
			}

			& > span {
				flex: 3;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-wrap: wrap;
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
