import app from "../app";
import { createServer } from "http";
import { port } from "../src/config";

// 서버 포트 설정
app.set("port", port);

// HTTP 서버 생성
const server = createServer(app);

// 지정된 포트에서 서버 실행
server.listen(port, () => {
  console.log(`Listening on ${port}...`);
});
