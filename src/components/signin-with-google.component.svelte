<script lang="ts">
	export let clientId;
	export let success;
</script>

<svelte:head>
	<meta name="google-signin-client_id" content={clientId} />
	<script src="https://apis.google.com/js/platform.js"></script>
</svelte:head>
<div class="g-signin2" data-onsuccess={success} />
