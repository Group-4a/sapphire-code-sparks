import React from "react";
import FlagButton from "../../../../components/Reporting/Flagging";
import MuteButton from "../../../../components/Reporting/Muting";
import { Table } from "antd";
import testImage from "../../../../assets/test.jpg";

export default function Reports({ classroomId }) {
  // Change to fetch reportData from database using classroomId
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
      render: (text, record) => {
        // Check if the reason is 'Inappropriate thumbnail' to display the image
        if (record.reason === 'Inappropriate thumbnail') {
          return <img src={testImage} alt="Inappropriate thumbnail" style={{ width: '50px', height: 'auto' }} />;
        }
        // Otherwise, just display the text
        return text;
      },
    },
    // {
    //   title: "Flag User",
    //   key: "actions",
    //   render: (text, record) => (
    //     <FlagButton
    //       user={record.user}
    //       classroomId={classroomId}
    //       isAdmin={true}
    //     />
    //   ),
    // },
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
