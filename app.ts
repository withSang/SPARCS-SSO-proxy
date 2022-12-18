import express, { json, Express } from "express";

import { SessionUser } from "./src/common/types";
import { sessionMiddleware } from "./src/middlewares";
import routes from "./src/routes";

// Express 앱 생성
const app: Express = express();

// JSON 파싱 미들웨어 사용
app.use(json());

// 세션 미들웨어 사용을 위한 타입 설정
declare module "express-session" {
  interface SessionData {
    user?: SessionUser;
    state?: string;
    returnUrl?: string;
  }
}
app.use(sessionMiddleware);

// 라우팅 설정
app.use(routes);

// 서버 실행 코드 분리
export default app;
