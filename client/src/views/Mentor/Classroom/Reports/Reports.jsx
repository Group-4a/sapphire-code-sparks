import React from "react";
import FlagButton from "../../../../components/Reporting/Flagging";

export default function Reports({ classroomId }) {
  return (
    <div>
      <h1>Reports</h1>
      <FlagButton id="flag" user={1234} classroomId={classroomId} />
    </div>
  );
}
