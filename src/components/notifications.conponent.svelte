<script>
	import {
		notificationsStore,
		deleteNotification,
		clearAllNotifications
	} from '../stores/notifications.store';
	import { fly, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let notifications = [];
	notificationsStore.subscribe((n) => {
		notifications = n;
	});
</script>

<div class="notifications">
	{#each notifications as notification}
		<p
			class={`notification ${notification.type}`}
			transition:fly={{ delay: 100, duration: 300, x: 300, y: 0, opacity: 0.5, easing: quintOut }}
		>
			{notification.content} <span on:click={() => deleteNotification(notification)}>X</span>
		</p>
	{/each}
	{#if notifications.length > 1}
		<button on:click={clearAllNotifications} transition:fade>clear all notifications</button>
	{/if}
</div>

<style>
	.notifications {
		position: fixed;
		top: 1em;
		right: 1em;
	}

	.notification {
		padding: 1em;
		border-radius: 8px;
	}

	.error {
		background-color: red;
	}

	.warning {
		background-color: yellow;
	}

	.info {
		background-color: blue;
	}
</style>
