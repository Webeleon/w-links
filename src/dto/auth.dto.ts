import { UserProfileDto } from './user-profile.dto';

export class AuthDto {
	loggedIn: boolean;
	user?: UserProfileDto;
	accessToken?: string;
}
