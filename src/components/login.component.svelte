<script lang="ts">
	import { googleLoginSuccess } from '../stores/auth.store';
	import { GoogleAuth } from '@beyonk/svelte-social-auth';
	import { variables } from '../variables';

	const onSignIn = (googleUser) => googleLoginSuccess(googleUser);
</script>

<div class="container">
	<div class="form">
		<GoogleAuth
			clientId={variables.googleClientId}
			on:auth-success={(e) => onSignIn(e.detail.user)}
		/>
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		min-width: 100vw;
	}
	.form {
		background-color: #efefef;
		min-width: 50vw;
		min-height: 75vh;
		border-radius: 8px;
		color: black;

		display: flex;
		flex-direction: column;
		padding: 1em;
		justify-content: space-evenly;
	}

	.form-input {
		display: flex;
		flex-direction: column;
	}

	input {
		height: 3em;
		border-radius: 8px;
	}

	button {
		height: 3em;
		border-radius: 8px;
	}
</style>
