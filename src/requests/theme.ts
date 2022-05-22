import { variables } from '../variables';
import { addNotification } from '../stores/notifications.store';
import { get } from 'svelte/store';
import { authStore, logout } from '../stores/auth.store';
import { ThemeDto } from '../dto/theme.dto';
import { getAuthenticatedUserProfile } from './profile';
import { defaultTheme } from '../themes/default.theme';

export const getTheme = async (slug: string) => {
	const { apiUrl } = variables;

	const response = await fetch(`${apiUrl}/themes/${slug}`, {
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		method: 'GET'
	});
	const data = await response.json();

	if (response.status === 200) {
		return data;
	} else {
		addNotification({
			time: new Date(),
			type: 'error',
			content: `Unexpected error: ${data.message}`
		});
	}
};

export const getUserTheme = async () => {
	const profile = await getAuthenticatedUserProfile();

	const { apiUrl } = variables;

	const response = await fetch(`${apiUrl}/themes/${profile.username}`, {
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		method: 'GET'
	});
	const data = await response.json();

	if (response.status === 401) {
		logout();
	} else if (response.status === 200) {
		return data;
	} else {
		addNotification({
			time: new Date(),
			type: 'error',
			content: `Unexpected error: ${data.message}`
		});
		return defaultTheme;
	}
};

export const updateTheme = async (theme: ThemeDto) => {
	const auth = get(authStore);
	if (!auth.loggedIn) {
		return [];
	}

	const { apiUrl } = variables;

	const response = await fetch(`${apiUrl}/themes`, {
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${auth.accessToken}`
		},
		method: 'PUT',
		body: JSON.stringify(theme)
	});

	if (response.status === 401) {
		logout();
	} else if (response.ok) {
		addNotification({
			time: new Date(),
			type: 'info',
			content: `theme updated`
		});
	} else {
		const data = await response.json();
		addNotification({
			time: new Date(),
			type: 'error',
			content: `Unexpected error: ${data.message}`
		});
	}
};
