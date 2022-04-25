<script context="module" lang="ts">
	import { linkTypesStore } from '../stores/link-types.store';
	let linkTypes;
	linkTypesStore.subscribe((l) => {
		linkTypes = l;
	});
</script>

<script lang="ts">
	import { fade } from 'svelte/transition';
	import { Link } from '../interfaces/link.interface';
	import { authStore } from '../stores/auth.store';
	import { AuthInterface } from '../interfaces/auth.interface';
	import { updateLink } from '../requests/links';
	import { deleteAndRefresh } from '../stores/links.store';
	import { debounce } from 'lodash';

	export let link: Link;
	let auth: AuthInterface;

	authStore.subscribe((_auth) => {
		auth = _auth;
	});

	const debouncedUpdateLink = debounce(
		() =>
			updateLink(auth, link.uuid, {
				type: link.type,
				target: link.target,
				displayName: link.displayName
			}),
		300
	);
</script>

<div class="card" transition:fade>
	<img src="/logo-{link.type}.svg" alt="logo {link.type}" />
	<select on:change={debouncedUpdateLink} bind:value={link.type}>
		{#each linkTypes as linkType}
			<option value={linkType}>{linkType}</option>
		{/each}
	</select>
	<input type="text" on:change={debouncedUpdateLink} bind:value={link.displayName} />
	<input type="text" on:change={debouncedUpdateLink} bind:value={link.target} />
	<div>
		<button on:click={() => deleteAndRefresh(auth, link.uuid)}>delete</button>
	</div>
</div>

<style lang="scss">
	.card {
		width: 300px;
		margin: 1em;
		padding: 1em;

		border: 2px solid #c482bf;
		border-radius: 8px;
		&:hover {
			box-shadow: 0 0 1em #c482bf;
		}

		background-color: #82d7c4;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	img {
		width: 64px;
	}
	input {
		background-color: transparent;
		border: none;
		border-bottom: 1px solid black;
		margin: 1em 0;
		width: 100%;
		height: 2em;
	}
	select {
		background-color: transparent;
		border-radius: 8px;
		margin: 1em 0;
		width: 100%;
		height: 2em;
	}
</style>
