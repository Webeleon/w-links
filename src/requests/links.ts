import { variables } from '../variables';
import { authStore, logout } from '../stores/auth.store';
import { addNotification } from '../stores/notifications.store';
import { get } from 'svelte/store';
import { OrderLinkDto } from '../dto/order-link.dto';

export const getPublicUserLinks = async (username: string) => {
	const { apiUrl } = variables;

	const response = await fetch(`${apiUrl}/links/public/${username}`, {
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

export const getUserLinks = async () => {
	const auth = get(authStore);
	if (!auth.loggedIn) {
		return [];
	}

	const { apiUrl } = variables;

	const response = await fetch(`${apiUrl}/links`, {
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

export const deleteLink = async (uuid: string) => {
	const auth = get(authStore)
	if (!auth.loggedIn) {
		return [];
	}

	const { apiUrl } = variables;

	const response = await fetch(`${apiUrl}/links/${uuid}`, {
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${auth.accessToken}`
		},
		method: 'DELETE'
	});

	if (response.status === 401) {
		logout();
	} else if (response.status === 200) {
		return;
	} else {
		const data = await response.json();
		addNotification({
			time: new Date(),
			type: 'error',
			content: `Unexpected error: ${data.message}`
		});
	}
};

export const createLink = async (body) => {
	const auth = get(authStore);
	if (!auth.loggedIn) {
		return [];
	}

	const { apiUrl } = variables;

	const response = await fetch(`${apiUrl}/links`, {
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${auth.accessToken}`
		},
		method: 'POST',
		body: JSON.stringify(body)
	});
	const data = await response.json();

	if (response.status === 401) {
		logout();
	} else if (response.status === 201) {
		addNotification({
			time: new Date(),
			type: 'info',
			content: `Link created with uuid ${data.uuid}`
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

export const updateLink = async (uuid: string, body) => {
	const auth = get(authStore);
	if (!auth.loggedIn) {
		return [];
	}

	const { apiUrl } = variables;

	const response = await fetch(`${apiUrl}/links/${uuid}`, {
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${auth.accessToken}`
		},
		method: 'PUT',
		body: JSON.stringify(body)
	});

	if (response.status === 401) {
		logout();
	} else if (response.status === 200) {
		addNotification({
			time: new Date(),
			type: 'info',
			content: `Link updated`
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

export const orderLinks = async (body: OrderLinkDto[]) => {
	const auth = get(authStore);
	if (!auth.loggedIn) {
		return [];
	}

	const { apiUrl } = variables;

	const response = await fetch(`${apiUrl}/links/manage/order`, {
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${auth.accessToken}`
		},
		method: 'PATCH',
		body: JSON.stringify(body)
	});

	if (response.status === 401) {
		logout();
	} else if (response.status === 200) {
		addNotification({
			time: new Date(),
			type: 'info',
			content: `Link reordered`
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
