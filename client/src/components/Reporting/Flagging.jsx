import React, { useState, useEffect } from "react";
import { BsFlag } from "react-icons/bs";

export default function FlagButton({ user, classroomId }) {
  const [flags, setFlags] = useState(0);

  function mute(user) {
    // mute user in backend stuff
    console.log("user muted");
  }

  function handleClick() {
    setFlags((prevFlags) => prevFlags + 1);
    if (flags + 1 == 5) {
      // arbitrary number that can be adjusted
      mute(user); // for unwritten mute function, should be adjusted as needed
    }
  }

  return (
    <BsFlag
      id="flag"
      style={{ width: "15px", height: "15px", color: "red", cursor: "pointer" }}
      onClick={handleClick}
    />
  );
}
