
import React, { useEffect, useState } from 'react';
import { getMentor, getClassrooms } from '../../../Utils/requests';
import { message } from 'antd';
import './Dashboard.less';
import DashboardDisplayCodeModal from './DashboardDisplayCodeModal';
import MentorSubHeader from '../../../components/MentorSubHeader/MentorSubHeader';
import NavBar from '../../../components/NavBar/NavBar';
import { useGlobalState } from '../../../Utils/userState';
import { useNavigate } from 'react-router-dom';

//Dashboard component
export default function Dashboard() {
  // State hooks for managing classrooms and accessing global user data
  const [classrooms, setClassrooms] = useState([]);
  const [value] = useGlobalState('currUser');
  const navigate = useNavigate();

  // Effect hook to fetch mentor and associated classrooms on component mount
  useEffect(() => {
    // Array to store classroom IDs associated with the mentor
    let classroomIds = [];

    // Fetch mentor data and handle the response
    getMentor().then((res) => {
      if (res.data) {
        // Extract classroom IDs from mentor data
        res.data.classrooms.forEach((classroom) => {
          classroomIds.push(classroom.id);
        });

        // Fetch detailed classroom data based on the extracted IDs
        getClassrooms(classroomIds).then((classrooms) => {
          // Update the state with the fetched classrooms
          setClassrooms(classrooms);
        });
      } else {
        // Display error message and navigate to teacher login page if fetch fails
        message.error(res.err);
        navigate('/teacherlogin');
      }
    });
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  // Function to handle navigation to a specific classroom
  const handleViewClassroom = (classroomId) => {
    navigate(`/classroom/${classroomId}`);
  };

  // Render Dashboard component
  return (
    <div className='container nav-padding'>
      {/* Render the navigation bar */}
      <NavBar />

      {/* Render a welcome message with the mentor's name */}
      <div id='main-header'>Welcome {value.name}</div>

      {/* Render a subheader for the mentor's classrooms */}
      <MentorSubHeader title={'Your Classrooms'}></MentorSubHeader>

      {/* Render a container for displaying mentor's classrooms */}
      <div id='classrooms-container'>
        <div id='dashboard-card-container'>
          {/* Map through classrooms and render a card for each */}
          {classrooms.map((classroom) => (
            <div key={classroom.id} id='dashboard-class-card'>
              {/* Left content container with classroom name and view button */}
              <div id='card-left-content-container'>
                <h1 id='card-title'>{classroom.name}</h1>
                <div id='card-button-container' className='flex flex-row'>
                  <button onClick={() => handleViewClassroom(classroom.id)}>
                    View
                  </button>
                </div>
              </div>

              {/* Right content container with code, student count, and modal */}
              <div id='card-right-content-container'>
                {/* Display code modal for the classroom */}
                <DashboardDisplayCodeModal code={classroom.code} />

                {/* Divider between code modal and student count */}
                <div id='divider' />

                {/* Container displaying the number of students in the classroom */}
                <div id='student-number-container'>
                  <h1 id='number'>{classroom.students.length}</h1>
                  <p id='label'>Students</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
