import React, { useState, useEffect } from "react";
import { BsFlag } from "react-icons/bs";

export default function FlagButton({ user, classroomId }) {
  const [flags, setFlags] = useState(0);
  let mutedUsers = [];

  function mute(user) {
    // mute user in backend stuff
	
    mutedUsers.push(user);
    postFilter(user);
    //muted users is list of users muted by the individual sending the funciton call
    console.log("user muted");
  }

  function postFilter(user){ //uses posts from gallery team
     for (let i = 0; i < posts.length(); i++) {
     posts = posts.filter(post => post.user.at(i) !== user);
    } //modify currently unimplemented post array that displays user posts to not include muted users  
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
