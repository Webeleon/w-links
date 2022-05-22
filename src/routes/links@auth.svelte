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
	import { onMount } from 'svelte';
	import { Link } from '../dto/link.dto';
	import LinkCard from '../components/link-card.component.svelte';
	import { createDefaultAndRefresh, linksStore, refreshLinks } from '../stores/links.store';
	import { flip } from 'svelte/animate';
	import { orderLinks } from '../requests/links';
	import { profileStore } from '../stores/profile.store';

	export let linkTypes;
	let links: Link[] = [];
	let hovering: number;

	onMount(async () => {
		await refreshLinks();
		linksStore.subscribe((_links) => {
			links = _links;
		});
	});

	const dragStart = (event, target) => {
		event.dataTransfer.setData('text/plain', target);
	};

	const drop = async (event, target) => {
		const start = parseInt(event.dataTransfer.getData('text/plain'));
		if (start < target) {
			links.splice(target + 1, 0, links[start]);
			links.splice(start, 1);
		} else {
			links.splice(target, 0, links[start]);
			links.splice(start + 1, 1);
		}

		linksStore.set(links);
		hovering = null;
		await orderLinks(
			links.map((l, idx) => ({
				uuid: l.uuid,
				order: idx
			}))
		);
	};

	$: profileStore;
</script>

<div class="container">
	<h2><a href={`/l/${$profileStore?.username}`}>Link page</a></h2>
	<div class="cards">
		{#each links as link, idx (link.uuid)}
			<div
				draggable="true"
				on:dragstart={(event) => dragStart(event, idx)}
				on:dragenter={() => (hovering = idx)}
				on:drop|preventDefault={(event) => drop(event, idx)}
				ondragover="return false"
				class:is-hovered={idx === hovering}
				animate:flip={{ duration: 500 }}
			>
				<LinkCard {link} {linkTypes}/>
			</div>
		{/each}
		<span class="add" on:click={() => createDefaultAndRefresh()}>+</span>
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	a {
		color: #efefef;
	}
	.cards {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
	}

	.add {
		font-size: 6em;
		background-color: #82d7c4;
		padding: 0;
		border-radius: 100%;
		border: 2px solid #c482bf;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1em;
		&:hover {
			box-shadow: 0 0 0.2em #c482bf;
		}
	}
	.is-hovered {
		opacity: 0.5;
	}
</style>
