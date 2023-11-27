import React, { useState } from "react";
import MuteButton from "../../../../components/Reporting/Muting";
import { Table, Space, Tag, Modal, Button } from "antd";
import testImage from "../../../../assets/test.jpg";
import PropTypes from "prop-types";

export default function Reports({ classroomId }) {
  const [reportsData, setReportsData] = useState([
    {
      key: "1",
      user: "John Doe",
      reason: "Inappropriate language",
      post: "This is the post content for report 1.",
      muted: ["Jane Smith", "Bill Bob"],
    },
    {
      key: "2",
      user: "Jane Smith",
      reason: "Inappropriate thumbnail",
      post: "This is the post content for report 2.",
      muted: [],
    },
    {
      key: "3",
      user: "Bill Bob",
      reason: "Bullying",
      post: "This is the post content for report 3.",
      muted: ["John Doe"],
    },
  ]);

  const [hiddenMutedUsers, setHiddenMutedUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState("");

  const updateMutedUsers = (userId, mutedUser) => {
    const updatedData = reportsData.map((report) => {
      if (report.key === userId) {
        const updatedMuted = report.muted.filter((user) => user !== mutedUser);
        return { ...report, muted: updatedMuted };
      }
      return report;
    });
    setReportsData(updatedData);
  };

  const toggleHideMutedUser = (user) => {
    if (hiddenMutedUsers.includes(user)) {
      setHiddenMutedUsers(hiddenMutedUsers.filter((hiddenUser) => hiddenUser !== user));
    } else {
      setHiddenMutedUsers([...hiddenMutedUsers, user]);
    }
  };

  const handleViewPostClick = (post) => {
    setSelectedPost(post);
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

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
        if (record.reason === "Inappropriate thumbnail") {
          return (
            <img
              src={testImage}
              alt="Inappropriate thumbnail"
              style={{ width: "50px", height: "auto" }}
            />
          );
        }
        return text;
      },
    },
    {
      title: "View Post",
      dataIndex: "post",
      key: "post",
      render: (text, record) => (
        <Button onClick={() => handleViewPostClick(record.post)}>
          View Post
        </Button>
      ),
    },
    {
      title: "Mute User",
      key: "actions",
      render: (text, record) => (
        <MuteButton
          user={record.key}
          classroomId={classroomId}
          isAdmin={true}
          onMuted={(mutedUser) => updateMutedUsers(record.key, mutedUser)}
        />
      ),
    },
    {
      title: "Students Muted by User",
      dataIndex: "muted",
      key: "muted",
      render: (muted, record) => (
        <Space>
          {muted.length > 0 ? (
            muted.map((user) => (
              <Tag
                key={user}
                color="blue"
                onClick={() => toggleHideMutedUser(user)}
                style={{
                  cursor: "pointer",
                  textDecoration: hiddenMutedUsers.includes(user)
                    ? "line-through"
                    : "none",
                }}
              >
                {hiddenMutedUsers.includes(user) ? "Unmuted" : user}
              </Tag>
            ))
          ) : (
            <span></span>
          )}
        </Space>
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

        <Modal
          title="View Post"
          visible={modalVisible}
          onCancel={handleModalCancel}
          footer={null}
        >
          <p>
            {selectedPost}
            <img
                  src={testImage} // Change this to the actual image source
                  alt="Sample Image"
                  style={{ width: "100%", height: "auto", marginTop: "10px" }}
                />
            </p>
        </Modal>
      </div>
    </div>
  );
}

Reports.propTypes = {
  classroomId: PropTypes.number,
};
