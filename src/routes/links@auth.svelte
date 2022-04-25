<script lang="ts">
	import { authStore } from '../stores/auth.store';
	import { onMount } from 'svelte';
	import { Link } from '../interfaces/link.interface';
	import LinkCard from '../components/link-card.component.svelte';
	import { AuthInterface } from '../interfaces/auth.interface';
	import { createDefaultAndRefresh, linksStore, refreshLinks } from '../stores/links.store';

	let links: Link[] = [];
	let auth: AuthInterface;
	let username: string;

	onMount(() => {
		authStore.subscribe(async (_auth) => {
			auth = _auth;
			username = auth.user.username;
			await refreshLinks(auth);
		});
		linksStore.subscribe((_links) => {
			links = _links;
		});
	});
</script>

<div class="container">
	<h2><a href={`/l/${username}`}>Link page</a></h2>
	<div class="cards">
		{#each links as link}
			<LinkCard {link} />
		{/each}
		<span class="add" on:click={() => createDefaultAndRefresh(auth)}>+</span>
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
</style>
