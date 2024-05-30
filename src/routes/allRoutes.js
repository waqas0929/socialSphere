import authenticateJWT from "../middleware/authmiddleware.js";
import postRouter from "./postRoutes.js";
import userRouter from "./userRoutes.js";

const allRoutes = [ userRouter, authenticateJWT, postRouter];

export default allRoutes;
