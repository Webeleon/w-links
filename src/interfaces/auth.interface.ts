export class AuthInterface {
	loggedIn: boolean;
	user?: {
		username?: string;
	};
	accessToken?: string;
}
