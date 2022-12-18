import Client from "./sparcsssov2.js";
import { ssoClientId, ssoClientSecret } from "../config";

const client = new Client(ssoClientId, ssoClientSecret, false);

export { client };
