import { UserEntity } from "../entities/user.entity";

export interface IUserRepository {
	create(name: string, email: string, password: string): Promise<UserEntity>;
	update(id: number, user: UserEntity): Promise<void>;
	delete(id: number): Promise<void>;
	findByEmail(email: string): Promise<UserEntity | null>;
}
