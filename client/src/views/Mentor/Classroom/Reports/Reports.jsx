import React from "react";
import FlagButton from "../../../../components/Reporting/Flagging";
import MuteButton from "../../../../components/Reporting/Muting";
import { Table } from "antd";
import testImage from "../../../../assets/test.jpg";

export default function Reports({ classroomId }) {
  // Change to fetch reportData from database using classroomId
  // Filler data for now until backend is implemented
  const reportsData = [
    {
      key: "1",
      user: "John Doe",
      reason: "Inappropriate language",
    },
    {
      key: "2",
      user: "Jane Smith",
      reason: "Inappropriate thumbnail",
    },
    {
      key: "3",
      user: "Bill Bob",
      reason: "Bullying",
    },
  ];

  // Table columns
  const columns = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      // Renders the flagged thumbnail if the reason is 'Inappropriate thumbnail'
      render: (text, record) => {
        if (record.reason === 'Inappropriate thumbnail') {
          return <img src={testImage} alt="Inappropriate thumbnail" style={{ width: '50px', height: 'auto' }} />;
        }
        return text;
      },
    },
    {
      title: "Mute User",
      key: "actions",
      render: (text, record) => (
        <MuteButton
          user={record.user}
          classroomId={classroomId}
          isAdmin={true}
        />
      ),
    },
  ];

  // Renders the table from other components
  return (
    <div className="reports-container">
      <div id="page-header">
        <h1>Reports</h1>
      </div>
      <div id="content-creator-table-container" style={{ marginTop: "6.6vh" }}>
        <Table dataSource={reportsData} columns={columns} />
      </div>
    </div>
  );
}
