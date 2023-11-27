import React, { useState } from "react";
import { BsMicMute } from "react-icons/bs";
import { message, Modal } from "antd";

import { getStudent } from '../../Utils/requests.js';

export default function MuteButton({ studentId, classroomId, isStudent, studentAnimal }) {
  const [mutes, setMutes] = useState(0);
  const threshold = 3;//Implement variable threshold eventually
  //Lowered base from 5 to 3 for student muting since students should not 
  //be able to mute too many people

  //Add confirm popup for student muting so it is not overused
  const showConfirm = (action) => {
    Modal.confirm({
      title: `Confirm ${action}`,
      content: `Are you sure you want to ${action.toLowerCase()} student ${studentId}?`,
      onOk() {
        if (action === "studentMute") {
          studentMute(studentId);
        } else if (action === "studentUnMute") {
          studentUnMute(studentId);
        }
      },
      onCancel() {
        // Do nothing if canceled, popup only for confirming
      },
    });
  };

  const studentMute = (studentId) => {
    // Todo: Implement the mute functionality here, making a request to the backend
    // getStudent("49").then(res);

    console.log(studentId);
    // Show a message
    message.success(`Student ${studentAnimal} has been muted.`);
  };

  const studentUnMute = (studentId) => {
    // Todo: Implement the unmute functionality here, making a request to the backend
    console.log("student unmuted");
    // Show a message
    message.success(`Student ${studentAnimal} has been unmuted.`);
  };

  const handleClick = () => {
    if (isStudent) {
      setMutes((prevMutes) => {
        const newMutes = prevMutes + 1;
        if (newMutes === threshold) {
          showConfirm();
        }
        return newMutes;
      });
    }
  };

  return (
    <BsMicMute
      id="mute"
      style={{
        width: "15px",
        height: "15px",
        color: mutes >= threshold ? "red" : "grey",
        cursor: isStudent ? "pointer" : "not-allowed",
      }}
      onClick={isStudent ? handleClick : null}
      title={mutes >= threshold ? "Mute threshold reached" : "Student has been muted"}
    />
  );
}
