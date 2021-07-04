import { Router } from "express";

import userRoute from "./User";

const routes = Router();

routes.use("/users", userRoute);

export default routes;
