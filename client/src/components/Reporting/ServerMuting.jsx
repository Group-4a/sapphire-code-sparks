import React, { useState } from "react";
import { BsMicMute } from "react-icons/bs";
import { message } from "antd";
import { updateReport } from '../../Utils/requests.js';
import PropTypes from "prop-types";

export default function MuteButton({ reportId, user, isServerMuted }) {
  const [isMuted, setIsMuted] = useState(isServerMuted);

  async function mute(reportId, user) {
    // Implement the mute functionality here, making a request to the backend
    try {
      await updateReport(reportId, { isServerMuted: true }); // Assuming 'user' is the report ID
      message.success(`User ${user} has been muted.`);
    } catch (error) {
      console.error("Error muting user:", error);
    }
  }

  async function unMute(reportId, user) {
    // Implement the unmute functionality here, making a request to the backend
    try {
      await updateReport(reportId, { isServerMuted: false });
      message.success(`User ${user} has been unmuted.`);
    } catch (error) {
      console.error("Error unmuting user:", error);
    }
  }

  function handleClick() {
    if (isMuted) {
      unMute(reportId, user);
      setIsMuted(false);
    }
    else {
      mute(reportId, user);
      setIsMuted(true);
    }
  }

  return (
    <BsMicMute
      id="flag"
      style={{
        width: "15px",
        height: "15px",
        color: isMuted ? "red" : "grey",
        cursor: "pointer",
      }}
      onClick={handleClick}
      title={isMuted ? "User has been muted" : "Flag user"}
    />
  );
}

MuteButton.propTypes = {
  reportId: PropTypes.string,
  user: PropTypes.string,
  isServerMuted: PropTypes.bool
};
