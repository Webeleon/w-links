export class UserProfileDto {
	uuid: string;
	username: string;
	email?: string;
	active: boolean;
	googleId?: string;
	password?: string;
}
