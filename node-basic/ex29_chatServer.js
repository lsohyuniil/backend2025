const http = require("http"),
  fs = require("fs"),
  path = require("path"),
  express = require("express"),
  socketio = require("socket.io"); // npm i socket.io

const app = express();

app.use("/", express.static(path.join(__dirname, "public")));

app.get("/chat", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "chat.html"));
});

// 웹 서버 가동
const server = http.createServer(app);
server.listen(5555, () => {
  console.log(`http://localhost:5555`);
});

// 소켓 서버 가동
const io = socketio().listen(server);

/*
[1] public 통신 : 나를 포함한 모든 접속자에게 메세지를 보냄
    io.sockets.emit()
[2] broadcast 통신 : 나를 제외한 모든 접속자에게 메세지를 보냄
    socket.broadcast.emit()
[3] private 통신 : 특정 접속자에게만 메세지를 보냄
    io.sockets.to(socket.id).emit()
[4] 특정 방에 입장한 접속자들에게만 메세지를 보냄
    io.sockets.in('방이름').emit()
*/

io.sockets.on("connection", (socket) => {
  // 클라이언트에서 챗 서버에 접속하면 '클'과 통신에 필요한 socket을 콜백함수에 전달
  console.log("connection 이벤트 핸들러>>클라이언트가 접속했어요.");

  // 클라이언트가 메세지를 보낼 때 'echo' 이벤트를 발생시켜 메세지를 보냄 => 서버 쪽에서 수신
  socket.on("echo", (data) => {
    console.log("from client >> " + data);
    io.sockets.emit("sendAll", data); // public 통신:  접속한 모든 클에게 메세지 전송 -> 클에서 sendAll 이벤트를 수신 (on('sendAll'))
  });
});
