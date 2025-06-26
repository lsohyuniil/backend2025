const express = require("express"),
  http = require("http"),
  cors = require("cors");
const { Server } = require("socket.io"); // npm i socket.io

const app = express();

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "http://localhost:5173" }, // react server
});

io.on("connection", (socket) => {
  console.log("## 유저 접속함 : ", socket.id);
  // 유저가 보내오는 메세지 수신 후 보내온 메세지를 public방식으로 전송
});

server.listen(5555, () => {
  console.log("socket.io 챗서버 실행 중 포트 번호 : 5555");
});
