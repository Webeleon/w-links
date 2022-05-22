<script context="module" lang="ts">
    import { getLinkTypes } from '../requests/link-types';

    export async function load() {
      return {
        props: {
          linkTypes: await getLinkTypes()
        }
      }
    }
</script>

<script lang="ts">
	import { cssVariables } from '../use/cssVariables';
    import { getUserTheme, updateTheme } from '../requests/theme';
    import { defaultTheme } from '../themes/default.theme';
    import { onMount } from 'svelte';

    export let linkTypes;
    let theme = defaultTheme;
    onMount(async () => {
      theme = await getUserTheme()
    })
</script>

<section class="theme-editor">
    <div>
        <label for="background-color">Background color</label>
        <input id="background-color" type="color" bind:value={theme.backgroundColor} />
    </div>
    <div>
        <label for="link-background-color">Links background color</label>
        <input id="link-background-color" type="color" bind:value={theme.linkBackgroundColor} />
    </div>
    <div>
        <label for="link-border-color">Link border color</label>
        <input id="link-border-color" type="color" bind:value={theme.linkBorderColor} />
    </div>
    <div>
        <label for="link-text-color">Link text color</label>
        <input id="link-text-color" type="color" bind:value={theme.linkTextColor} />
    </div>
    <button on:click={() => updateTheme(theme)}>save</button>
</section>
<section class="preview" use:cssVariables={theme}>
	{#each linkTypes as linkType}
		<a href="#">
			<img src="/logo-{linkType}.svg" alt="logo {linkType}" />
			<span>{linkType}</span>
		</a>
	{/each}
</section >

<style lang="scss">
	.theme-editor {
      padding: 2em;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      color: #efefef;

      & > div {
        display: flex;
        align-items: center;
        & > label {
          margin-right: 0.5em;
        }
      }
	}
	.preview {
		margin: 3em;
		background-color: var(--backgroundColor);

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 8px;
		padding: 1em;

		& > a {
			min-height: 2.5em;
			width: 75vw;
			color: var(--linkTextColor);

			border: 2px solid var(--linkBorderColor);
			border-radius: 8px;
			&:hover {
				box-shadow: 0 0 1em var(--linkBorderColor);
			}

			margin: 0.5em;
			background-color: var(--linkBackgroundColor);
			height: 5em;
			font-size: 2em;

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
</style>
