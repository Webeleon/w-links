import { writable } from 'svelte/store';
import { authStore } from './auth.store';
import { getAuthenticatedUserProfile } from '../requests/profile';
import { UserProfileDto } from '../dto/user-profile.dto';

export const profileStore = writable<UserProfileDto>({
	uuid: '',
	username: ''
});

authStore.subscribe(async (auth) => {
	if (auth.loggedIn) {
		const profile = await getAuthenticatedUserProfile();
		profileStore.set(profile);
	}
});
