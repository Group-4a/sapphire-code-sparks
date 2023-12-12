import { React, useEffect } from 'react';
import { Tabs } from 'antd';
import './Classroom.less';

import NavBar from '../../../components/NavBar/NavBar';
import Roster from './Roster/Roster';
import Home from './Home/Home';
import Reports from './Reports/Reports';
import SavedWorkSpaceTab from '../../../components/Tabs/SavedWorkspaceTab';
import { useSearchParams, useParams } from 'react-router-dom';


const { TabPane } = Tabs;

//Classroom component
export default function Classroom({
  handleLogout,
  selectedActivity,
  setSelectedActivity,
}) {
  // Get and destructure parameters from the URL using react-router-dom
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  const tab = searchParams.get('tab');
  const viewing = searchParams.get('viewing');

  // Use useEffect to set the classroom ID in sessionStorage when it changes
  useEffect(() => {
    sessionStorage.setItem('classroomId', id);
  }, [id]);

  // Render the component
  return (
    <div className='container nav-padding'>
      {/* Render the NavBar component with appropriate props */}
      <NavBar isMentor={true} />
      
      {/* Render Ant Design Tabs for navigation */}
      <Tabs
        // Set default active tab based on the URL parameter or default to 'home'
        defaultActiveKey={tab ? tab : 'home'}
        // Handle tab change by updating URL parameters
        onChange={(key) => setSearchParams({ tab: key })}
      >
        {/* Render Home tab with appropriate props */}
        <TabPane tab='Home' key='home'>
          <Home
            classroomId={parseInt(id)}
            selectedActivity={selectedActivity}
            setSelectedActivity={setSelectedActivity}
            viewing={viewing}
          />
        </TabPane>

        {/* Render Roster tab with appropriate props */}
        <TabPane tab='Roster' key='roster'>
          <Roster handleLogout={handleLogout} classroomId={id} />
        </TabPane>

        {/* Render Saved Workspaces tab with appropriate props */}
        <TabPane tab='Saved Workspaces' key='workspace'>
          <SavedWorkSpaceTab
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            classroomId={id}
          />
        </TabPane>

        {/* Render Reports tab with appropriate props */}
        <TabPane tab='Reports' key='reports'>
          <Reports classroomId={id}/>
        </TabPane>
      </Tabs>
    </div>
  );
}
