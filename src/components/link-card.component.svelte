

<script lang="ts">
	import { fade } from 'svelte/transition';
	import { Link } from '../dto/link.dto';
	import { updateLink } from '../requests/links';
	import { deleteAndRefresh } from '../stores/links.store';
	import { StatsSummaryDto } from '../dto/stats-summary.dto';
	import { getLinkStatsSummary } from '../requests/statistics';
	import _ from 'lodash';
	import { onMount } from 'svelte';

	const { debounce } = _;

	export let link: Link;
	export let linkTypes;
	let stats: StatsSummaryDto = {
		clicks: 0
	};

	onMount(async () => {
		stats = await getLinkStatsSummary(link.uuid);
	});

	const debouncedUpdateLink = debounce(
		() =>
			updateLink(link.uuid, {
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
	<p>
		clicks: {stats.clicks}
	</p>
	<div>
		<button on:click={() => deleteAndRefresh(link.uuid)}>delete</button>
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
