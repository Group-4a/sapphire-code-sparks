import React, { useState } from "react";
import { BsFlag } from "react-icons/bs";
import { message } from "antd";

export default function FlagButton({ user, classroomId, isAdmin }) {
  // Todo: fetch flags from database using classroomId, do not initialize to 0
  const [flags, setFlags] = useState(0);
  let threshold = 5;

  function mute(user) {
    // Todo: Implement the mute functionality here, making a request to the backend
    console.log("user flagged");
    // Show a message
    message.success(`User ${user} has been flagged.`);
  }

  function unMute(user) {
    // Todo: Implement the unmute functionality here, making a request to the backend
    console.log("user unflagged");
    // Show a message
    message.success(`User ${user} has been unflagged.`);
  }

  // Handles auto-muting and flag increments
  function handleClick() {
    if (isAdmin) {
      if (flags >= threshold) {
        unMute(user);
        setFlags(0);
        return;
      } else {
        mute(user);
        setFlags(threshold);
        return;
      }
    } else {
      setFlags((prevFlags) => {
        const newFlags = prevFlags + 1;
        if (newFlags === threshold) {
          mute(user);
        }
        return newFlags;
      });
    }
  }

  return (
    <BsFlag
      id="flag"
      style={{
        width: "15px",
        height: "15px",
        color: flags >= threshold ? "grey" : "red",
        cursor: "pointer",
      }}
      onClick={handleClick}
      title={flags >= threshold ? "User has been flagged" : "Flag user"}
    />
  );
}
