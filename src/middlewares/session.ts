import session from "express-session";
import KnexSessionStore from "connect-session-knex";

import { sessionSecret } from "../config";

const SessionStore = KnexSessionStore(session);

export const sessionMiddleware = session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60, // 1 hour
  },
  store: new SessionStore({}), // 세션은 SQLite DB에 저장됨.
});
