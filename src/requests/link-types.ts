import { variables } from '../variables';

export const getLinkTypes = async () => {
	const response = await fetch(`${variables.apiUrl}/links/metadata/link-types`);
	const linkTypes = await response.json();

	return linkTypes;
};
