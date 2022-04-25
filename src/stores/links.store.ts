import { writable } from 'svelte/store';
import { Link } from '../interfaces/link.interface';
import { createLink, deleteLink, getUserLinks } from '../requests/links';
import { AuthInterface } from '../interfaces/auth.interface';

export const linksStore = writable<Link[]>([]);

export const refreshLinks = async (auth: AuthInterface) => {
	const links = await getUserLinks(auth);
	linksStore.set(links);
};

export const deleteAndRefresh = async (auth: AuthInterface, uuid: string) => {
	await deleteLink(auth, uuid);
	await refreshLinks(auth);
};

export const createDefaultAndRefresh = async (auth: AuthInterface) => {
	await createLink(auth, {
		displayName: 'change me!',
		target: 'https://webeleon.dev'
	});
	await refreshLinks(auth);
};
