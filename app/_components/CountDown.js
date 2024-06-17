"use client";
import React, { useState, useEffect, useCallback } from "react";

const MILLISECONDS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;

const Countdown = ({ hours: forHours }) => {
  const ms = forHours * 3600 * 1000;
  const [time, setTime] = useState(Number(ms));

  const totalSeconds = time / MILLISECONDS_PER_SECOND;
  const seconds = Math.floor(totalSeconds % SECONDS_PER_MINUTE);

  const totalMinutes = totalSeconds / SECONDS_PER_MINUTE;
  const minutes = Math.floor(totalMinutes % MINUTES_PER_HOUR);

  const totalHours = totalMinutes / MINUTES_PER_HOUR;
  const hours = Math.floor(totalHours % HOURS_PER_DAY);

  const days = Math.floor(totalHours / HOURS_PER_DAY);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime((prevTime) => prevTime - MILLISECONDS_PER_SECOND);
    }, 1000);

    return () => clearTimeout(timer);
  }, [time]);

  if (!time) {
    return null;
  }

  return (
    <div className="flex text-black space-x-9">
      <div className="relative flex flex-col items-start">
        <span className="text-sm">Days</span>
        <span className="text-4xl font-bold">
          {String(days).padStart(2, "0")}
        </span>
        <span className="text-primary loading-none text-3xl absolute -right-5 bottom-1 ">
          {" "}
          :{" "}
        </span>
      </div>
      <div className="relative flex flex-col items-start">
        <span className="text-sm">Hours</span>
        <span className="text-4xl font-bold">
          {String(hours).padStart(2, "0")}
        </span>
        <span className="text-primary loading-none text-3xl absolute -right-5 bottom-1 ">
          {" "}
          :{" "}
        </span>
      </div>
      <div className="relative flex flex-col items-start">
        <span className="text-sm">Minutes</span>
        <span className="text-4xl font-bold">
          {String(minutes).padStart(2, "0")}
        </span>
        <span className="text-primary loading-none text-3xl absolute -right-5 bottom-1 ">
          {" "}
          :{" "}
        </span>
      </div>
      <div className="flex flex-col items-start">
        <span className="text-sm">Seconds</span>
        <span className="text-4xl font-bold">
          {String(seconds).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
};

export default Countdown;
