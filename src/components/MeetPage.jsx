import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const MeetPage = () => {
  const { roomId } = useParams();
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const initMeeting = async () => {
      try {
        // Get user media (camera + mic)
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        // TODO: Add WebRTC or Socket.io signaling here
        // Abhi ke liye sirf apna local video dikhega
      } catch (err) {
        console.error("Error accessing media devices:", err);
        setError("Camera/Microphone access blocked.");
      }
    };

    initMeeting();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Meeting Room: {roomId}</h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
        {/* Local Video */}
        <div className="bg-black rounded-2xl overflow-hidden shadow-lg">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-64 object-cover"
          ></video>
          <p className="text-center text-white bg-gray-800 p-2">You</p>
        </div>

        {/* Remote Video Placeholder */}
        <div className="bg-black rounded-2xl overflow-hidden shadow-lg">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-64 object-cover"
          ></video>
          <p className="text-center text-white bg-gray-800 p-2">Remote</p>
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <button className="px-4 py-2 bg-red-600 text-white rounded-xl shadow hover:bg-red-700">
          End Call
        </button>
        <button className="px-4 py-2 bg-gray-600 text-white rounded-xl shadow hover:bg-gray-700">
          Mute
        </button>
        <button className="px-4 py-2 bg-gray-600 text-white rounded-xl shadow hover:bg-gray-700">
          Stop Video
        </button>
      </div>
    </div>
  );
};

export default MeetPage;
