"use client";

import { ChartAreaInteractive } from "./Main_chart";
import { DeviceControl } from "@/components/DeviceControl";
import React, { useEffect, useState } from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6 space-y-6">
        <App />
        <div className="flex justify-end">
          <DeviceControl />
        </div>
        <ChartAreaInteractive />
      </div>
    </div>
  );
}

function App() {
  const [data, setData] = useState(null);
  const [blink, setBlink] = useState(false);
  const [wsConnected, setWsConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket("wss://toda-backend-tr28.onrender.com");

    ws.onopen = () => {
      console.log("✅ WebSocket connected");
      setWsConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const newData = JSON.parse(event.data);

        setData(newData);
        setBlink(true);
        setTimeout(() => setBlink(false), 150);
      } catch (err) {
        console.error("❌ Error parsing message", err);
      }
    };

    ws.onerror = (err) => {
      console.error("❌ WebSocket error", err);
    };

    ws.onclose = () => {
      console.warn("⚠️ WebSocket closed");
      setWsConnected(false);
    };

    return () => ws.close();
  }, []);

  const blinkClass = blink
    ? "opacity-0 transition-opacity duration-150"
    : "opacity-100 transition-opacity duration-150";

  const openUserManual = () => {
    window.open("/user-manual.pdf", "_blank");
  };

  const openInstallationGuide = () => {
    window.open("/installation-guide.pdf", "_blank");
  };

  return (
    <div className="font-sans p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Live Tuya Device Monitor</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={openInstallationGuide}
            className="px-4 py-2 bg-purple-800 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 text-sm font-medium"
          >
            🔧 Installation Guide
          </button>
          <button
            onClick={openUserManual}
            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-400 transition-colors duration-200 text-sm font-medium"
          >
            📖 User Manual
          </button>
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                wsConnected ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <span className="text-sm text-gray-600">
              {wsConnected ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>
      </div>

      {data ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xl">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="text-sm font-medium text-gray-500 mb-1">Time</div>
            <div className={`font-semibold ${blinkClass}`}>
              {new Date(data.time).toLocaleTimeString()}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="text-sm font-medium text-gray-500 mb-1">
              Current
            </div>
            <div className="font-semibold">{data.current} mA</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="text-sm font-medium text-gray-500 mb-1">
              Voltage
            </div>
            <div className="font-semibold">{data.voltage} V</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="text-sm font-medium text-gray-500 mb-1">Power</div>
            <div className="font-semibold">{data.power} W</div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Waiting for data...</p>
      )}
    </div>
  );
}
