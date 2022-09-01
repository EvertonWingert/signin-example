import { Request, Response } from "express";
import { AppError } from "../errors/app.error";
import { UserRepository } from "../repositories/user.repository";
import { SignInUseCase } from "../usecases/auth/signin.usecase";

export class AuthController {
	async signIn(request: Request, response: Response) {
		const userRepository = new UserRepository();
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
