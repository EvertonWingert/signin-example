import { IUserRepository } from "../../interfaces/user.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/app.error";

type Input = {
	email: string;
	password: string;
};

type Output = {
	token: string;
};

export class SignInUseCase {
	constructor(private readonly userRepository: IUserRepository) {}

	async execute({ email, password }: Input): Promise<Output> {
		const user = await this.userRepository.findByEmail(email);
		if (!user) {
			throw new AppError("Invalid credentials", 422);
		}

		const isValid = await bcrypt.compare(password, user.password);
		if (!isValid) {
			throw new AppError("Invalid credentials", 422);
		}

		const token = jwt.sign(
			{
				id: user.id,
			},
			"SUPERSECRET"
		);

		return {
			token,
		};
	}
}
