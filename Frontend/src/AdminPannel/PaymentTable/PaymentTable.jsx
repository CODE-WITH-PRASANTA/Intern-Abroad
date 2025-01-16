import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Utils/Api'; // Import the configured axios instance
import './PaymentTable.css';

const PaymentTable = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Fetch payments from the backend using axiosInstance
    axiosInstance
      .get('/form') // Use axiosInstance for the API call
      .then((response) => {
        setPayments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching payments:', error);
      });
  }, []);

  return (
    <div className="table-container">
      <h1>Payment Records</h1>
      <table className="payment-table">
        <thead>
          <tr>
            <th>Phone</th>
            <th>Nationality</th>
            <th>Program Email</th>
            <th>Start Date</th>
            <th>Industry</th>
            <th>Duration</th>
            <th>UTR No</th>
            <th>Payment Method</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id}>
              <td>{payment.phone}</td>
              <td>{payment.nationality}</td>
              <td>{payment.programEmail}</td>
              <td>{payment.startDate}</td>
              <td>{payment.selectedIndustry}</td>
              <td>{payment.selectedDuration}</td>
              <td>{payment.utrNo}</td>
              <td>{payment.paymentMethod}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
