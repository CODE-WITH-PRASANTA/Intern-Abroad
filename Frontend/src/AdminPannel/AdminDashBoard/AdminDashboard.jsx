import React from "react";
import { Calendar as ReactCalendar } from 'react-calendar'; // Import the Calendar component
import 'react-calendar/dist/Calendar.css'; // Import styles for the calendar
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        {/* Stats Cards */}
        <div className="stats-card green">
          <h3>27</h3>
          <p>Posts</p>
        </div>
        <div className="stats-card red">
          <h3>0</h3>
          <p>Pending Posts</p>
        </div>
        <div className="stats-card purple">
          <h3>0</h3>
          <p>Drafts</p>
        </div>
        <div className="stats-card yellow">
          <h3>1</h3>
          <p>Users</p>
        </div>
      </div>

      <div className="dashboard-body">
        <div className="card">
          <h4>Pending Comments</h4>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Comment</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {/* Add pending comments here */}
            </tbody>
          </table>
          <button className="view-all">View All</button>
        </div>

        <div className="card">
          <h4>Contact Messages</h4>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>55</td>
                <td>t7v8uEKT'))</td>
                <td>select pg_sleep(6); --</td>
                <td>2024-10-27 / 15:17</td>
              </tr>
              {/* Add additional rows as necessary */}
            </tbody>
          </table>
          <button className="view-all">View All</button>
        </div>

        <div className="card">
          <h4>Payment Successful Notification</h4>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Transaction</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {/* Add payment notifications here */}
            </tbody>
          </table>
        </div>

        <div className="card">
  <h4>Employee Appreciations</h4>
  <table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Employee Name</th>
        <th>Appreciation</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {/* Employee appreciation data will be mapped here dynamically */}
    </tbody>
  </table>
</div>


        {/* Important Notes and Calendar Section */}
        <div className="important-notes-calendar">
          <div className="important-notes">
            <h4>Important Notes</h4>
            <ul>
              <li>Note 1: Review pending comments regularly.</li>
              <li>Note 2: Ensure data integrity for transactions.</li>
            </ul>
          </div>

          <div className="calendar">
            <h4>Calendar</h4>
            <ReactCalendar
              mode="single"
              weekStartsOn={1}
              numberOfMonths={1}
              enableYearNavigation={true}
              locale="en-US" // Set locale if needed
            />
          </div>
        </div>
      </div>

 

      {/* Students Section */}
      <div className="students-section">
        <h4>Students</h4>
        <table>
          <thead>
            <tr>
              <th>Student Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Enrolled On</th>
            </tr>
          </thead>
          <tbody>
            {/* Add student data dynamically from DB */}
            <tr>
              <td>101</td>
              <td>John Doe</td>
              <td>johndoe@example.com</td>
              <td>2024-09-15</td>
            </tr>
            <tr>
              <td>102</td>
              <td>Jane Smith</td>
              <td>janesmith@example.com</td>
              <td>2024-09-20</td>
            </tr>
            {/* Add more rows here */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
