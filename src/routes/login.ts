import { Router, Request, Response } from "express";

import {
  loginWithSPARCSSSO,
  loginCallback,
  logoutFromSPARCSSSO,
} from "../controllers/login";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  loginWithSPARCSSSO(req, res);
});

router.get("/callback", (req: Request, res: Response) => {
  loginCallback(req, res);
});

/**
 * @todo SPARCS SSO에서도 로그아웃 시키기
 */
router.get("/logout", (req: Request, res: Response) => {
  logoutFromSPARCSSSO(req, res);
});

export default router;
