// npm i react-icons
// npm i socket.io-client
import { IoChatbubblesOutline } from "react-icons/io5";
import "./chat.css";
import { useAuthStore } from "../../stores/authStore";
import { useEffect, useRef, useState } from "react";
import socket from "./socket";

type ChatMessage = {
  sender: string;
  message: string;
};

export default function ChatApp() {
  const authUser = useAuthStore((s) => s.authUser);
  const isLoading = useAuthStore((s) => s.isLoading);

  //   const [nickName, setNickName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [chatList, setChatList] = useState<ChatMessage[]>([]);

  const messageRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // unmount될 땐 서버 연결을 끊어 줘야함
    if (!socket.connected) {
      socket.connect(); // 챗 서버에 연결
      console.log("챗 서버와 연결됨...");
    }

    // 서버가 보내오는 메세지를 들어서 chatList에 출력
    socket.on("receiveMessage", (data: ChatMessage) => {
      setChatList((prev) => [...prev, data]);
    });

    return () => {
      // unmount될 때 실행되는 cleanup 함수
      if (socket.connected) {
        console.log("useEffect cleanup 소켓 연결 끊음...");
        socket.off("receiveMessage"); // 이벤트 receiveMessage 제거
        socket.disconnect(); // 챗 서버 연결 중지
      }
    };
  }, []);

  useEffect(() => {
    // if (!isLoading && authUser) {
    //   setNickName(authUser.name);
    // }

    // 새 메세지가 추가될 때 마다 해당 요소로 스크롤 하도록
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatList, isLoading, authUser]);

  const sendMessage = () => {
    if (!authUser?.name.trim()) return;
    socket.emit("sendMessage", { sender: authUser?.name, message: message });
    setMessage("");
    messageRef.current?.focus();
  };

  if (isLoading || !authUser) {
    return (
      <div className="alert alert-primary">
        <h2>
          <IoChatbubblesOutline />
          실시간 채팅
        </h2>
        <h3>로그인 후 이용 가능합니다.</h3>
      </div>
    );
  }

  return (
    <div className="wrap">
      <h2>
        <IoChatbubblesOutline />
        실시간 채팅
      </h2>
      {authUser && (
        <input
          name="nickName"
          placeholder="닉네임 입력"
          value={authUser?.name}
          //   onChange={(e) => setNickName(e.target.value)}
          className="input"
          disabled
        />
      )}
      <div className="divMsg">
        {chatList.map((msg, idx) => (
          <div key={idx}>
            <strong>{msg.sender} : </strong>
            <span>{msg.message}</span>
          </div>
        ))}

        {/* ref 설정. 스크롤 되도록 empty div를 챗팅 메세지 목록 끝에 위치 시킴 */}
        <div ref={endRef} />
      </div>
      <input
        name="message"
        value={message}
        ref={messageRef}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        placeholder="메세지 입력"
        className="input_msg"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
          }
        }}
      />
      <button className="btn btn-info mx-1" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}
