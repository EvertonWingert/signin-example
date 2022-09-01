import express from "express";
import { AuthController } from "./controllers/auth.controller";

const app = express();

app.use(express.json());

app.post("/singIn", new AuthController().signIn);

app.listen(3000, () => {
	console.log("Server running");
});
