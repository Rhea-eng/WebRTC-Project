import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import './Lobby.css'

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );
  // const handleJoinRoom = useCallback((e) => {
  //   e.preventDefault();;
  //   console.log({
  //     email, room
  //   })
  // }, [])

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="container">
      <div className = "lobby">
      <p>Heartfelt Connections.</p>
      </div>
      <form onSubmit={handleSubmitForm}>
      <div className="email">
        <label htmlFor="email">Email ID</label>
        <input
        className="emailbox"
        placeholder="    Enter the Email Address."
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <br />
        <div className="email">
        <label htmlFor="room">Room No</label>
        <input
        className="roombox"
        placeholder="    Enter the room number."
          type="text"
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        </div>
        <br />
        <div className="button">
        <button className="join">Connect</button>
        </div>
      </form>
    </div>
  );
};

export default LobbyScreen;
