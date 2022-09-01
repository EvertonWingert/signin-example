import express from "express";
import { AuthController } from "./controllers/auth.controller";
import { handleError } from "./middlewares/error.middleware";

const app = express();
const router = express.Router();

app.use(express.json());

router.post("/singIn", new AuthController().signIn);
app.use(router);
app.use(handleError);

app.listen(3000, () => {
	console.log("Server running");
});
