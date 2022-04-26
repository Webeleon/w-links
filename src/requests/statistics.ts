import { AuthDto } from '../dto/auth.dto';
import { variables } from '../variables';
import { logout } from '../stores/auth.store';
import { addNotification } from '../stores/notifications.store';

export const getLinkStatsSummary = async (auth: AuthDto, uuid: string) => {
	if (!auth.loggedIn) {
		return [];
	}

	const { apiUrl } = variables;

	const response = await fetch(`${apiUrl}/statistics/${uuid}/summary`, {
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
