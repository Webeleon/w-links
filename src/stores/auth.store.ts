import { writable } from 'svelte/store';
import { addNotification } from './notifications.store';
import { AuthDto } from '../dto/auth.dto';
import { clearAuth, getAuth, saveAuth } from '../local-storage/auth.local-storage';
import { variables } from '../variables';
import { getAuthenticatedUserProfile } from '../requests/profile';

const loggedOutState = {
	loggedIn: false
};

export const authStore = writable<AuthDto>(loggedOutState);

export const logout = () => {
	authStore.set(loggedOutState);
	clearAuth();

	addNotification({
		time: new Date(),
		type: 'info',
		content: 'logged out successfully'
	});
};

export const googleLoginSuccess = async (googleUser: any) => {
	console.log();
	const authData = {
		loggedIn: true,
		user: {
			username: googleUser.Lu.tf
		},
		idToken: googleUser.xc.id_token,
		accessToken: googleUser.xc.id_token
	};

	authData.user = await getAuthenticatedUserProfile(authData);
	saveAuth(authData);
	authStore.set(authData);

	addNotification({
		time: new Date(),
		type: 'info',
		content: `Welcome back ${authData.user.username}!`
	});
};

export const login = async (email: string, password: string) => {
	const response = await fetch(`${variables.apiUrl}/auth/login`, {
		body: JSON.stringify({
			email,
			password
		}),
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if (response.status === 200) {
		const json = await response.json();
		const authData = {
			loggedIn: true,
			accessToken: json.access_token,
			user: json.user
		};

		authStore.update(() => authData);

		saveAuth(authData);

		addNotification({
			time: new Date(),
			type: 'info',
			content: `Welcome back ${json.user.username}!`
		});
	} else {
		addNotification({
			time: new Date(),
			type: 'error',
			content: `Failed to login... try again...`
		});
	}
};

// init store with saved session
export const initAuthFromStorage = () => {
	const authData = getAuth();
	if (authData) {
		authStore.update(() => authData);
	}
};
