import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../repositories/user.repository";
import { SignInUseCase } from "../usecases/auth/signin.usecase";

export class AuthController {
	async signIn(request: Request, response: Response, next: NextFunction) {
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

			return response.status(200).json(token);
		} catch (e) {
			next(e);
		}
	}
}
