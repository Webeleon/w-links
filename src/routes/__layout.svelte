<script>
	import '../app.scss';
	import Notifications from '../components/notifications.conponent.svelte';
</script>

<Notifications />
<slot />

<svelte:head>
	<title>w-links</title>
	<meta name="description" content="a link manager for social media respecting users privacy." />
</svelte:head>
