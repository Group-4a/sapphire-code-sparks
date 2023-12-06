import React, { useState, useEffect } from "react";
import MuteButton from "../../../../components/Reporting/ServerMuting";
import { Table, Space, Tag, Modal, Button } from "antd";
import testImage from "../../../../assets/test.jpg";
import PropTypes from "prop-types";
import BlocklyPage from "../../../BlocklyPage/BlocklyPage";
import "./Reports.less";
import {
  getReports,
  deleteReports,
  updateReport,
} from "../../../../Utils/requests";

export default function Reports({ classroomId }) {

  const [reportsData, setReportsData] = useState(null);

  useEffect(() => {
    const loadReportsData = async () => {
      try {
        const temp = await getReports();
        setReportsData(temp.data);
      } catch (error) {
        console.error("Error fetching reports in Reports.jsx:", error);
        setReportsData(null);
      }
    };

    loadReportsData();
  }, [classroomId]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState("");

  const updateMutedUsers = async (reportId, mutedUser) => {
    const updatedData = reportsData.map((report) => {
      if (report.id === reportId) {
        // Check if report has a muted object and a users array inside it
        const mutedUsers = report.muted?.users ?? [];
        const updatedMutedUsers = mutedUsers.filter(
          (user) => user !== mutedUser
        );

        // Create an updated report object with the new list of muted users
        const updatedReport = {
          ...report,
          muted: { ...report.muted, users: updatedMutedUsers },
        };

        // Update the report in the backend
        updateReport(reportId, updatedReport)
          .then(() => {
            console.log("Report updated successfully");
            console.log(updatedReport);
          })
          .catch((error) => {
            console.error("Error updating report:", error);
          });

        return updatedReport;
      }
      return report;
    });

    setReportsData(updatedData);
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
      title: "Report ID",
      dataIndex: "id",
      key: "id",
    },
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
      title: "Students That Muted User",
      dataIndex: "muted",
      key: "muted",
      render: (muted, record) => (
        <Space>
          {muted?.users?.length > 0 ? (
            muted.users.map((user) => (
              <Tag  
                key={user}
                color="blue"
                onClick={() => updateMutedUsers(record.id, user)}
                style={{ cursor: "pointer" }}
              >
                {user}
              </Tag>
            ))
          ) : (
            <span>No muted users</span>
          )}
        </Space>
      ),
    },
    {
      title: "View Post",
      dataIndex: "post",
      key: "post",
      width: "10%",
      align: "center",
      render: (text, record) => (
        <Button onClick={() => handleViewPostClick(record.post)}>View</Button>
      ),
    },
    {
      title: "Mute User",
      key: "actions",
      width: "10%",
      align: "center",
      render: (text, record) => (
        <MuteButton
          reportId={record.id}
          user={record.user}
          isServerMuted={record.isServerMuted}
        />
      ),
    },
    {
      title: "Remove",
      key: "remove",
      width: "10%",
      align: "center",
      render: (text, record) => (
        <Button
          onClick={async () => {
            try {
              await deleteReports(record.id);
              const updatedReports = reportsData.filter(
                (report) => report.id !== record.id
              );
              setReportsData(updatedReports);
            } catch (error) {
              console.error("Error deleting report:", error);
            }
          }}
          style={{ backgroundColor: "#ff4d4f", color: "white" }}
        >
          Remove
        </Button>
      ),
    },
  ];

  // For connecting post data to backend
  // const res = getSaves(activityId);
  // localStorage.setItem("my-activity", JSON.stringify(res.data));

  // Renders the table from other components
  return (
    <div className="reports-container">
      <div id="page-header">
        <h1>Reports</h1>
      </div>
      <div id="content-creator-table-container" style={{ marginTop: "6.6vh" }}>
        <Table dataSource={reportsData} columns={columns} />

        <Modal
          title="Reported Post"
          open={modalVisible}
          onCancel={handleModalCancel}
          footer={null}
          bodyStyle={{ maxHeight: "70vh", maxWidth: "60vh", width: "60vh" }}
        >
          <p>{selectedPost}</p>
          <div className="small-blockly-page">
            <BlocklyPage isSandbox={false} />
          </div>
        </Modal>
      </div>
    </div>
  );
}

Reports.propTypes = {
  classroomId: PropTypes.number,
};
