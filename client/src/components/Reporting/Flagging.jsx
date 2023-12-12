import React, { useState } from "react";
import { BsFlag } from "react-icons/bs";
import { Menu, Dropdown } from "antd";
import PropTypes from "prop-types";

import { getReports, createReport, updateReport } from "./requests";

export default function FlagButton({ user, threshold, classroomId }) {
  const [flags, setFlags] = useState(0);
  const [visible, setVisible] = useState(false); // For controlling the visibility of the dropdown

  // Helper function to find a user's report from all reports
  const findUserReport = (reports, userId) => {
    return reports.find((report) => report.user === userId);
  };

  // Function to handle clicking the flag button
  async function handleClick() {
    const reportsResponse = await getReports();
    if (reportsResponse.err) {
      console.error("Error fetching reports:", reportsResponse.err);
      return;
    }

    const userReport = findUserReport(reportsResponse.data, user);

    if (userReport) {
      // If report exists, update it
      const updatedReport = {
        ...userReport,
        count: userReport.count + 1,
        isServerMuted: userReport.count + 1 >= threshold
      };
      await updateReport(userReport.id, updatedReport);
      setFlags((prevFlags) => prevFlags + 1);
    } else {
      // Open the menu to choose a reason
      setVisible(true);
    }
  }

  // Function to handle selecting a report reason from the menu
  async function handleReport(reason) {
    setVisible(false);

    await createReport({
      user,
      reason,
      post: "Post content here",
      muted: {},
      isServerMuted: false,
      count: 1,
      classroom: classroomId,
      published_at: new Date().toISOString(),
      created_by: "string",
      updated_by: "string",
    });

    setFlags((prevFlags) => prevFlags + 1);
  }

  const menu = (
    <Menu onClick={(e) => handleReport(e.key)}>
      <Menu.Item key="Inappropriate language">Inappropriate language</Menu.Item>
      <Menu.Item key="Inappropriate thumbnail">Inappropriate thumbnail</Menu.Item>
      <Menu.Item key="Bullying">Bullying</Menu.Item>
      <Menu.Item key="Other">Other</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]} visible={visible} onVisibleChange={(v) => setVisible(v)}>
      <BsFlag
        id="flag"
        style={{
          width: "15px",
          height: "15px",
          color: flags >= threshold ? "grey" : "red",
          cursor: "pointer",
        }}
        title={flags >= threshold ? "User has been flagged" : "Flag user"}
        onClick={handleClick}
      />
    </Dropdown>
  );
}

FlagButton.propTypes = {
  user: PropTypes.string,
  threshold: PropTypes.number,
  classroomId: PropTypes.number,
};
