import { AuthDto } from '../dto/auth.dto';
export const AUTH_STORAGE_KEY = 'auth';

export const getAuth = (): AuthDto | undefined => {
	const data = localStorage.getItem(AUTH_STORAGE_KEY);
	if (!data) return;
	return JSON.parse(data);
};

export const saveAuth = (auth: AuthDto) => {
	localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
};

export const clearAuth = () => {
	localStorage.removeItem(AUTH_STORAGE_KEY);
};
