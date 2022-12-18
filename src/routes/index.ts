import { Router } from "express";

import apiRouter from "./api";
import loginRouter from "./login";

const router = Router();

router.use("/", loginRouter);
router.use("/api", apiRouter);

export default router;
