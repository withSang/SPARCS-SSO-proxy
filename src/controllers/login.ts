import { Request, Response } from "express";

import { client } from "../utils/ssoClientWrapper";
import { SSOUser } from "../common/types";

const defaultReturnUrl = "https://sparcssso.kaist.ac.kr/";

/**
 * 로그인에 성공하면 클라이언트를 세션에 저장된 returnUrl으로 리다이렉트함
 */
const loginDone = (req: Request, res: Response, ssoUserData: SSOUser) => {
  req.session.user = {
    sid: ssoUserData.sid,
    sparcs_id: ssoUserData.sparcs_id,
  };
  res.redirect(req.session.returnUrl || defaultReturnUrl);
};

/**
 * 로그인에 실패하면 클라이언트를 SPARCS SSO 로그인 페이지로 리다이렉트함
 */
const loginFalse = (req: Request, res: Response) => {
  res.redirect(defaultReturnUrl);
};

const loginWithSPARCSSSO = (req: Request, res: Response) => {
  // 로그인 후 돌아갈 url을 세션에 저장함
  if (req.query.rd === undefined) {
    loginFalse(req, res);
    return;
  }
  const returnUrl = String(req.query.rd) || defaultReturnUrl;
  req.session.returnUrl = returnUrl;

  // SPARCS SSO 로그인 페이지로 리다이렉트함
  const { url, state } = client.getLoginParams();
  req.session.state = state;
  res.redirect(url);
};

const loginCallback = (req: Request, res: Response) => {
  const state1 = req.session.state;
  const state2 = req.body.state || req.query.state;

  if (state1 != state2) loginFalse(req, res);
  else {
    const code = req.body.code || req.query.code;
    client.getUserInfo(code).then((ssoUserData: SSOUser) => {
      // SPARCS 회원인 경우, sparcs_id가 빈 문자열이 아님
      if (ssoUserData.sparcs_id !== "") loginDone(req, res, ssoUserData);
      else loginFalse(req, res);
    });
  }
};

const logoutFromSPARCSSSO = (req: Request, res: Response) => {
  const sid = req.session.user?.sid;
  req.session.destroy(() => {
    const logoutUrl = client.getLogoutUrl(sid, defaultReturnUrl);
    res.redirect(logoutUrl);
  });
};

export { loginWithSPARCSSSO, loginCallback, logoutFromSPARCSSSO };
