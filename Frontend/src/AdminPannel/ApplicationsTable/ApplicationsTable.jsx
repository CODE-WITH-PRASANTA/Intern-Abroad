import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Utils/Api'; // Import the configured axios instance
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const ApplicationsTable = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axiosInstance.get('/internships'); // Use axiosInstance
        setApplications(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching applications:", error);
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>DOB</TableCell>
            <TableCell>Nationality</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Internship Type</TableCell>
            <TableCell>Selected Industries</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Internship Length</TableCell>
            <TableCell>Courses</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>Details</TableCell>
            <TableCell>UTR No</TableCell>
            <TableCell>Payment Method</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applications.map((application, index) => (
            <TableRow key={index}>
              <TableCell>{application.name}</TableCell>
              <TableCell>{application.email}</TableCell>
              <TableCell>{application.phone}</TableCell>
              <TableCell>{application.gender}</TableCell>
              <TableCell>{`${application.day}-${application.month}-${application.year}`}</TableCell>
              <TableCell>{application.nationality}</TableCell>
              <TableCell>{application.address}</TableCell>
              <TableCell>{application.internshipType}</TableCell>
              <TableCell>
                {application.selectedIndustries?.map(industry => industry.name).join(', ') || "N/A"}
              </TableCell>
              <TableCell>{application.location}</TableCell>
              <TableCell>{application.internshipLength}</TableCell>
              <TableCell>
                {application.courses?.map(course => course.name).join(', ') || "N/A"}
              </TableCell>
              <TableCell>{new Date(application.internshipStartDate).toLocaleDateString() || "N/A"}</TableCell>
              <TableCell>{application.internshipDetails}</TableCell>
              <TableCell>{application.utrNo}</TableCell>
              <TableCell>{application.paymentMethod}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ApplicationsTable;
