export class UserEntity {
	createdAt: Date;
	updatedAt: Date | null;
	id: number;
	name: string;
	email: string;
	password: string;

	constructor(id: number, name: string, email: string, password: string, createdAt: Date, updatedAt: Date | null) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
}
