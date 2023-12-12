import { getClassroom, createReport, deleteReports } from "../src/reports.js";
import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Reports from '../src/components/Reports';

var assert = require("assert");

describe("Backend reporting system", function () {
  describe("Create a report and get classroom", function () {
    it("should create a report and return the correct report when we get the classroom", function () {
      var report = createReport("andy", 20, 11);
      var classroom = getClassroom(11);
      var reportId = classroom.reports.
      assert.equal(classroom.report, report);
      const temp = deleteReports(reportId);
    });
  });
  describe("Get the wrong classroom", function() {
    it("should return null", function() {
      var classroom = getClassroom(1337);
      assert.equal(classroom, null);
    });
  });
});

describe('<Reports />', () => {
    it('renders without crashing', () => {
      const wrapper = shallow(<Reports classroomId={1} />);
      expect(wrapper.exists()).to.be.true;
    });
});
describe('<Reports /> interactions', () => {
    it('calls updateMutedUsers when a mute tag is clicked', () => {
      const reportsData = [{ /* mock report data */ }];
      const wrapper = mount(<Reports classroomId={1} />);
      wrapper.setState({ reportsData });
  
      const firstMuteTag = wrapper.find('.mute-tag').first();
      const updateMutedUsersSpy = sinon.spy(wrapper.instance(), 'updateMutedUsers');
  
      firstMuteTag.simulate('click');
  
      expect(updateMutedUsersSpy.calledOnce).to.be.true;
    });
  });

  describe('<Reports /> Rendering', () => {
    it('renders without crashing', () => {
      const wrapper = shallow(<Reports classroomId={1} />);
      expect(wrapper.exists()).to.be.true;
    });
  });
  describe('<Reports /> useEffect Hook', () => {
    it('calls getClassroom on mount', () => {
      const getClassroomSpy = sinon.spy(getClassroom);
      mount(<Reports classroomId={1} />);
      expect(getClassroomSpy.calledOnce).to.be.true;
    });
  });
  describe('<Reports /> Modal Functionality', () => {
    it('opens and closes the modal correctly', () => {
      const wrapper = shallow(<Reports classroomId={1} />);
      wrapper.instance().handleViewPostClick("Post content");
      expect(wrapper.state('modalVisible')).to.be.true;
  
      wrapper.instance().handleModalCancel();
      expect(wrapper.state('modalVisible')).to.be.false;
    });
  });
  describe('<Reports /> Report Deletion', () => {
    it('deletes a report and updates state', async () => {
      const reportsData = [{ id: 1, user: "User1" }, { id: 2, user: "User2" }];
      const wrapper = shallow(<Reports classroomId={1} />);
      wrapper.setState({ reportsData });
  
      await wrapper.instance().columns[6].render(null, reportsData[0]).props.onClick();
      expect(wrapper.state('reportsData')).to.have.lengthOf(1);
      expect(wrapper.state('reportsData')[0].id).to.equal(2);
    });
  });
  describe('<Reports /> Report Updating', () => {
    it('updates a report and modifies state', async () => {
      const reportsData = [{ id: 1, user: "User1", muted: { users: ["User2"] } }];
      const wrapper = shallow(<Reports classroomId={1} />);
      wrapper.setState({ reportsData });
  
      await wrapper.instance().updateMutedUsers(1, "User2");
      expect(wrapper.state('reportsData')[0].muted.users).to.not.include("User2");
    });
  });
  describe('<Reports /> Rendering with Data', () => {
    it('renders table rows correctly based on data', () => {
      const reportsData = [{ id: 1, user: "User1" }, { id: 2, user: "User2" }];
      const wrapper = shallow(<Reports classroomId={1} />);
      wrapper.setState({ reportsData });
  
      expect(wrapper.find('Table').prop('dataSource')).to.equal(reportsData);
      expect(wrapper.find('Table').shallow().find('TableRow')).to.have.lengthOf(2);
    });
  });
        