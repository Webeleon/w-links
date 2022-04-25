import { writable } from 'svelte/store';

export class Notification {
	time: Date;
	type: 'error' | 'warning' | 'info';
	content: string;
}

export const notificationsStore = writable<Notification[]>([]);

export const addNotification = (notification: Notification) => {
	notificationsStore.update((notifications) => [...notifications, notification]);
};

export const deleteNotification = (notification: Notification) => {
	notificationsStore.update((notifications) => {
		return notifications.filter((n) => JSON.stringify(n) !== JSON.stringify(notification));
	});
};

export const clearAllNotifications = () => {
	notificationsStore.set([]);
};
