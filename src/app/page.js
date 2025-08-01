"use client";

import { ChartAreaInteractive } from "./Main_chart";
import React, { useEffect, useState } from "react";

export default function Home() {
  return (
    <div>
      <App />
      <ChartAreaInteractive />
    </div>
  );
}

function App() {
  const [data, setData] = useState(null);
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5050");

    ws.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setData(newData);

      // Trigger blink: temporarily hide values
      setBlink(true);
      setTimeout(() => setBlink(false), 1); // Invisible for 150ms
    };

    return () => ws.close();
  }, []);

  const blinkClass = blink
    ? "opacity-0 transition-opacity duration-150"
    : "opacity-100 transition-opacity duration-150";

  return (
    <div className="font-sans p-6">
      <h1 className="text-2xl font-bold mb-6">🔌 Live Tuya Device Monitor</h1>

      {data ? (
        <div className="text-xl space-y-3">
          <p>
            <strong>Time:</strong>{" "}
            <span className={blinkClass}>
              {new Date(data.time).toLocaleTimeString()}
            </span>
          </p>
          <p>
            <strong>Current:</strong> <span>{data.current} A</span>
          </p>
          <p>
            <strong>Voltage:</strong> <span>{data.voltage} V</span>
          </p>
          <p>
            <strong>Power:</strong> <span>{data.power} W</span>
          </p>
        </div>
      ) : (
        <p className="text-gray-500">Waiting for data...</p>
      )}
    </div>
  );
}
