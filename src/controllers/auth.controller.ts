import { Request, Response } from "express";
import { UserEntity } from "../entities/user.entity";
import { AppError } from "../errors/app.error";
import { IUserRepository } from "../interfaces/user.repository";
import { UserRepository } from "../repositories/user.repository";
import { SignInUseCase } from "../usecases/auth/signin.usecase";

class R implements IUserRepository {
	create(name: string, email: string, password: string): Promise<UserEntity> {
		throw new Error("Method not implemented.");
	}
	update(id: number, user: UserEntity): Promise<void> {
		throw new Error("Method not implemented.");
	}
	delete(id: number): Promise<void> {
		throw new Error("Method not implemented.");
	}
	findByEmail(email: string): Promise<UserEntity | null> {
		throw new Error("Method not implemented.");
	}
}

export class AuthController {
	async signIn(request: Request, response: Response) {
		const userRepository = new R();
		const signInUseCase = new SignInUseCase(userRepository);

		const { email, password } = request.body;

		if (!email) {
			return response.status(422).json({
				message: "Email is required",
			});
		}

		if (!password) {
			return response.status(422).json({
				message: "password is required",
			});
		}

		try {
			const { token } = await signInUseCase.execute({
				email,
				password,
			});

			response.status(200).json(token);
		} catch (e) {
			if (e instanceof AppError) {
				return response.status(e.code).json({
					message: e.message,
				});
			}

			return response.status(400).json({
				message: "Opps...",
			});
		}
	}
}
