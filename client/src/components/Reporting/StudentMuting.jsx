import React, { useState } from "react";
import { BsMicMute } from "react-icons/bs";
import { message } from "antd";
import { updateReport, getStudent } from '../../Utils/requests.js';

export default function StudentMuteButton({ user, reportedUser, reportId, initialState }) {
  const [isMuted, setIsMuted] = useState(initialState);

  async function handleMuteChange() {
    try {
      // Get the current report data
      const reportResponse = await getStudent(reportedUser);
      const report = reportResponse.data;

      // Update the muted users list
      let updatedMutedUsers;
      if (isMuted) {
        // Unmute logic
        updatedMutedUsers = report.muted.users.filter(mutedUser => mutedUser !== user);
      } else {
        // Mute logic
        updatedMutedUsers = [...report.muted.users, user];
      }

      // Update the report in the backend
      const updatedReport = { ...report, muted: { ...report.muted, users: updatedMutedUsers }};
      await updateReport(reportId, updatedReport);

      // Update local state
      setIsMuted(!isMuted);
      message.success(`User ${user} has been ${isMuted ? 'unmuted' : 'muted'}.`);
    } catch (error) {
      console.error("Error updating report:", error);
      message.error(`Failed to ${isMuted ? 'unmute' : 'mute'} user.`);
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
      onClick={handleMuteChange}
      title={isMuted ? "User has been muted" : "Flag user"}
    />
  );
}
