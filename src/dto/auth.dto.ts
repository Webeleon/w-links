export class AuthDto {
	loggedIn: boolean;
	user?: {
		username?: string;
		uuid?: string;
	};
	accessToken?: string;
}
