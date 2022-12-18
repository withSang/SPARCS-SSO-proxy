import "./config";

console.log(process.env.PORT);

const port = process.env.PORT || "12280";
const host = process.env.HOST || "localhost";

const sessionSecret = process.env.SESSION_SECRET;
const ssoClientId = process.env.SPARCSSSO_CLIENT_ID;
const ssoClientSecret = process.env.SPARCSSSO_CLIENT_KEY;

if (
  sessionSecret === undefined ||
  ssoClientId === undefined ||
  ssoClientSecret === undefined
) {
  throw new Error("No session secret, SSO client id, or SSO client secret");
}

export { port, host, sessionSecret, ssoClientId, ssoClientSecret };
