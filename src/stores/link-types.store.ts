import { writable } from 'svelte/store';
import { variables } from '../variables';

export const linkTypesStore = writable<string[]>([]);

(async () => {
	const response = await fetch(`${variables.apiUrl}/links/metadata/link-types`);
	const linkTypes = await response.json();
	linkTypesStore.set(linkTypes);
})();
