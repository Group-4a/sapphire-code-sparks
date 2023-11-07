import React from "react";
import FlagButton from "../../../../components/Reporting/Flagging";
import { Table } from "antd";

/*
// Define a model for the database table
const Student = sequelize.define('User', {
  key: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isMuted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  isFlagged: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  
});
*/

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

  // Push the report data to the temporary database
  /*
  try {
    await Listing.sync({ force: true });
    
   
     for( var test in reportsData ){
      var entry = reportsData[test];
      for( var i=0; i< entry.length; i++ ){
  
        // Initalize all vars that need to be added to the database
        var vkey = null
        var vuser = null
        var vreason = null
  
        // Assign the key
        vkey = entry[i].key

        // Assign the user
        vuser = entry[i].user

        // Assign the reason
        vreason = entry[i].reason

        const databse_push = Listing.create({ reason: vreason,  user: vuser, key: vkey });
  
      }
  }
  
      });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  */


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
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <FlagButton
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
      <div
            id='content-creator-table-container'
            style={{ marginTop: '6.6vh' }}
          >
      <Table dataSource={reportsData} columns={columns} />
      </div>
    </div>
  );
}
