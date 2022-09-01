import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app.error";

export const handleError = (err: TypeError | AppError, req: Request, res: Response, next: NextFunction) => {
	if (!(err instanceof AppError)) {
		return res.status(500).json({
			message: "Internal server error",
		});
	}

	res.status(err.code).json({
		message: err.message,
	});
};
