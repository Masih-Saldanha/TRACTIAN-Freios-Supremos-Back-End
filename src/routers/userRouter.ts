import { Router } from "express";
import userController from "../controllers/userController.js";
import { validateSchema } from "../middlewares/schemaValidationMiddleware.js";
import userSchema from "../schemas/userSchema.js";

const userRouter = Router();

userRouter.post("/", validateSchema(userSchema.registerUser), userController.registerUser);
userRouter.get("/:id", userController.findUserById);
userRouter.get("/", userController.findAllUsers);
userRouter.put("/", validateSchema(userSchema.editUser), userController.editUserById);
userRouter.delete("/", validateSchema(userSchema.deleteUser), userController.deleteUserById);

export default userRouter;