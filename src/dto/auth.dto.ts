export class AuthDto {
	loggedIn: boolean;
	user?: {
		username?: string;
	};
	accessToken?: string;
}
