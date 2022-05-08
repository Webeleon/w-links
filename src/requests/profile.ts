import { variables } from '../variables';
import { authStore, logout } from '../stores/auth.store';
import { addNotification } from '../stores/notifications.store';
import { UpdateUserProfileDto } from '../dto/update-user-profile.dto';
import { get } from 'svelte/store';

export const getAuthenticatedUserProfile = async () => {
	const auth = get(authStore);
	const { apiUrl } = variables;

	const response = await fetch(`${apiUrl}/users/profile`, {
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${auth.accessToken}`
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
	}
};

export const updateAuthenticatedUserProfile = async (body: UpdateUserProfileDto) => {
	const { apiUrl } = variables;
	const auth = get(authStore);

	const response = await fetch(`${apiUrl}/users/profile`, {
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${auth.accessToken}`
		},
		method: 'PUT',
		body: JSON.stringify(body)
	});
	const data = await response.json();

	if (response.status === 401) {
		logout();
	} else if (response.status === 200) {
		addNotification({
			time: new Date(),
			type: 'info',
			content: 'user profile saved!'
		});
		return data;
	} else {
		addNotification({
			time: new Date(),
			type: 'error',
			content: `Unexpected error: ${data.message}`
		});
	}
};
