import { writable } from 'svelte/store';
import { addNotification } from './notifications.store';
import { AuthInterface } from '../interfaces/auth.interface';
import { clearAuth, getAuth, saveAuth } from '../local-storage/auth.local-storage';
import { variables } from '../variables';

const loggedOutState = {
	loggedIn: false
};

export const authStore = writable<AuthInterface>(loggedOutState);

export const logout = () => {
	authStore.set(loggedOutState);
	clearAuth();

	addNotification({
		time: new Date(),
		type: 'info',
		content: 'logged out successfully'
	});
};

export const login = async (username: string, password: string) => {
	const response = await fetch(`${variables.apiUrl}/auth/login`, {
		body: JSON.stringify({
			username,
			password
		}),
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if (response.status === 200) {
		const json = await response.json();
		console.log('AUTH JSON', json);
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
