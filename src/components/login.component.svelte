<script lang="ts">
	import { login } from '../stores/auth.store';

	let username;
	let password;
</script>

<div class="container">
	<div class="form">
		<div class="form-input">
			<label for="username">Username</label>
			<input bind:value={username} type="text" id="username" />
		</div>
		<div class="form-input">
			<label for="password">Password</label>
			<input bind:value={password} type="password" id="password" />
		</div>
		<button on:click={() => login(username, password)}>Login</button>
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
