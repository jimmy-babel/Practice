import { useState, useRef, useEffect } from "react";

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() => {
    console.log("VideoPlayer useEffect");
    if (isPlaying) {
      console.log("调用 video.play()");
      ref.current.play();
    } else {
      console.log("调用 video.pause()");
      ref.current.pause();
    }
    return () => {
      console.log("VideoPlayer useEffect clean up");
    };
  }, [isPlaying]);

  return <video ref={ref} src={src} loop playsInline />;
}

export function VideoCmpt() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState("");
  return (
    <>
      <h1>useEffect.jsx</h1>
      <h2>function VideoCmpt</h2>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? "暂停" : "播放"}
      </button>
      <VideoPlayer
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </>
  );
}

function createConnection(serverUrl, roomId) {
  // 实际的实现将会连接到服务器
  return {
    connect() {
      console.log('✅ 连接到 "' + roomId + '" 房间，位于' + serverUrl + "...");
    },
    disconnect() {
      console.log('❌ 断开 "' + roomId + '" 房间，位于' + serverUrl);
    },
  };
}

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState("https://localhost:1234");
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, serverUrl]);
  return (
    <>
      <div>
        <label>
          服务器URL:
          <input
            value={serverUrl}
            onChange={(e) => setServerUrl(e.target.value)}
          ></input>
        </label>
        <h3>当前是{roomId}房间</h3>
      </div>
    </>
  );
}

export function ChatRoomBox() {
  const [roomId, setRoomId] = useState("firstRoom");
  return (
    <>
      <div>
        <label>
          选择聊天室:
          <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
            <option value="firstRoom">1房间</option>
            <option value="secondRoom">2房间</option>
            <option value="thirdRoom">3房间</option>
          </select>
        </label>
        <ChatRoom roomId={roomId}></ChatRoom>
      </div>
    </>
  );
}
