<script lang="ts">
	import { authStore } from '../stores/auth.store';
	import { AuthDto } from '../dto/auth.dto';
	import { onMount } from 'svelte';
	import { getAuthenticatedUserProfile, updateAuthenticatedUserProfile } from '../requests/profile';
	import { UserProfileDto } from '../dto/user-profile.dto';
	import _ from 'lodash';

	const { debounce } = _;

	let auth: AuthDto;
	let profile: UserProfileDto = {
		uuid: '',
		username: '',
		email: '',
		password: '',
		googleId: '',
		active: false
	};

	onMount(() => {
		authStore.subscribe(async (_auth) => {
			auth = _auth;
			if (auth.loggedIn) profile = await getAuthenticatedUserProfile(auth);
		});
	});

	const debouncedUpdateProfile = debounce(() => updateAuthenticatedUserProfile(auth, profile), 300);
	const reset = async () => {
		profile = auth.user;
		await updateAuthenticatedUserProfile(auth, profile);
	};
</script>

<section>
	<div class="profile">
		<div>
			<label for="username">username</label>
			<input
				type="text"
				id="username"
				on:change={debouncedUpdateProfile}
				bind:value={profile.username}
			/>
		</div>
		<div>
			<label for="email">email</label>
			<input
				type="email"
				id="email"
				on:change={debouncedUpdateProfile}
				bind:value={profile.email}
			/>
		</div>
		<div>
			<label for="password">password</label>
			<input
				type="password"
				id="password"
				on:change={debouncedUpdateProfile}
				bind:value={profile.password}
			/>
		</div>
		<div>
			<button on:click={reset}>reset</button>
		</div>
	</div>
</section>

<style lang="scss">
	section {
		min-height: calc(100vh - 3.5em);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.profile {
		background-color: #82d7c4;
		border: 1px solid #c482bf;
		border-radius: 8px;
		padding: 2em;
	}
	input {
		background-color: transparent;
		border: none;
		border-bottom: 1px solid black;
		margin: 1em 0;
		width: 100%;
		height: 2em;

		&:focus {
			outline: none;
			background-color: #d6e5fa;
			border-radius: 6px;
		}
	}
</style>
