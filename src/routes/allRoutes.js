import authenticateJWT from "../middleware/authmiddleware.js";
// import emailRouter from "./emailRoutes.js";
import postRouter from "./postRoutes.js";
import searchRouter from "./searchRoutes.js";
import userRouter from "./userRoutes.js";

const allRoutes = [ userRouter, authenticateJWT, postRouter, searchRouter];

export default allRoutes;
