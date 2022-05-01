import { AuthDto } from '../dto/auth.dto';
import { variables } from '../variables';
import { logout } from '../stores/auth.store';
import { addNotification } from '../stores/notifications.store';
import { UpdateUserProfileDto } from '../dto/update-user-profile.dto';

export const getAuthenticatedUserProfile = async (auth: AuthDto) => {
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

export const updateAuthenticatedUserProfile = async (auth: AuthDto, body: UpdateUserProfileDto) => {
	const { apiUrl } = variables;

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
