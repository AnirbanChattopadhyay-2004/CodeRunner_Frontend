"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Users } from "lucide-react";

export default function JoinRoom() {
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();
  const handleJoinRoom = (e) => {
    e.preventDefault();
    // Handle room joining logic here
    console.log("Joining room:", roomCode);
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#151030]">
      <div className="w-full max-w-md p-8 rounded-2xl bg-[#1c1836] shadow-2xl border border-[#2a2550]">
        <div className="flex items-center justify-center mb-8">
          <Users className="w-12 h-12 text-[#8f7ce2]" />
        </div>
        <h1 className="text-3xl font-bold text-center text-white mb-4">
          Join Collaboration
        </h1>
        <form onSubmit={handleJoinRoom} className="space-y-4">
          <div className="flex  flex-col  justify-center items-center gap-3">
            <label htmlFor="roomCode" className="text-[#a29dba]">
              Room Code
            </label>
            <input
              id="roomCode"
              type="number"
              placeholder="Enter room code"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              className="w-full mt-2 h-12 rounded-md border-none ring-offset-0 text-center bg-[#2a244b]   text-white placeholder-[#5e5a7d]"
            />
          </div>
          <button
            type="submit"
            onClick={() => {
              navigate("/collab/" + roomCode);
            }}
            className="w-full  h-12 bg-[#8f7ce2] rounded-md flex justify-center items-center text-white hover:bg-[#7a69d1] transition-all duration-200"
          >
            Join Room
            <ArrowRight className="w-6 h-4 ml-2" />
          </button>
        </form>
        <div className="mt-5 flex flex-col gap-5 text-center">
          <span className="text-[#a29dba]">or</span>
          <button
            type="submit"
            onClick={() => {
              navigate("/collab/" + roomCode);
            }}
            className="w-full h-12 bg-[#8f7ce2] rounded-md flex justify-center items-center text-white hover:bg-[#7a69d1] transition-all duration-200"
          >
            Create a Room
            <ArrowRight className="w-6 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}
