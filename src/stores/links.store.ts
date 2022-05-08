import { writable } from 'svelte/store';
import { Link } from '../dto/link.dto';
import { createLink, deleteLink, getUserLinks } from '../requests/links';

export const linksStore = writable<Link[]>([]);

export const refreshLinks = async () => {
	const links = await getUserLinks();
	linksStore.set(links);
};

export const deleteAndRefresh = async (uuid: string) => {
	await deleteLink(uuid);
	await refreshLinks();
};

export const createDefaultAndRefresh = async () => {
	await createLink({
		displayName: 'change me!',
		target: 'https://webeleon.dev'
	});
	await refreshLinks();
};
