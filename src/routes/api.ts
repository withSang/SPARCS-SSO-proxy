import { Router, Request, Response } from "express";

import { verifyUser } from "../controllers/api";

const router = Router();

router.get("/verify", (req: Request, res: Response) => {
  verifyUser(req, res);
});

export default router;
