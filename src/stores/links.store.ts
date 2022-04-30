import { writable } from 'svelte/store';
import { Link } from '../dto/link.dto';
import { createLink, deleteLink, getUserLinks } from '../requests/links';
import { AuthDto } from '../dto/auth.dto';

export const linksStore = writable<Link[]>([]);

export const refreshLinks = async (auth: AuthDto) => {
	const links = await getUserLinks(auth);
	linksStore.set(links);
};

export const deleteAndRefresh = async (auth: AuthDto, uuid: string) => {
	await deleteLink(auth, uuid);
	await refreshLinks(auth);
};

export const createDefaultAndRefresh = async (auth: AuthDto) => {
	await createLink(auth, {
		displayName: 'change me!',
		target: 'https://webeleon.dev'
	});
	await refreshLinks(auth);
};
