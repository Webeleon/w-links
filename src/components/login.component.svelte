<script lang="ts">
	import { googleLoginSuccess, login } from '../stores/auth.store';
	import { GoogleAuth } from '@beyonk/svelte-social-auth';

	let email;
	let password;

	const onSignIn = (googleUser) => googleLoginSuccess(googleUser);
</script>

<div class="container">
	<div class="form">
		<div class="form-input">
			<label for="username">Email</label>
			<input bind:value={email} type="email" id="username" />
		</div>
		<div class="form-input">
			<label for="password">Password</label>
			<input bind:value={password} type="password" id="password" />
		</div>
		<button on:click={() => login(email, password)}>Login</button>

		<GoogleAuth
			clientId="1035799241886-c071l8kgob11it5pueeesqlvo9o0ho4u.apps.googleusercontent.com"
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
