import { UserEntity } from "../entities/user.entity";
import { IUserRepository } from "../interfaces/user.repository";
import client from "../database";

export class UserRepository implements IUserRepository {
	client;

	constructor() {
		this.client = client.user;
	}

	async findByEmail(email: string): Promise<UserEntity | null> {
		const user = await this.client.findFirst({
			where: { email },
		});

		if (!user) {
			return null;
		}

		return new UserEntity(user.id, user.name, user.email, user.password, user.created_at, user.updated_at);
	}

	async create(name: string, email: string, password: string): Promise<UserEntity> {
		const user = await this.client.create({
			data: {
				name,
				email,
				password,
			},
		});

		return new UserEntity(user.id, user.name, user.email, user.password, user.created_at, user.updated_at);
	}

	async update(id: number, user: UserEntity): Promise<void> {
		await this.client.update({
			data: user,
			where: {
				id,
			},
		});
	}

	delete(id: number): Promise<void> {
		throw new Error("Method not implemented.");
	}
}
