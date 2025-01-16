import React, { useState } from 'react';
import axiosInstance from '../../Utils/Api'; // Import axiosInstance
import './ManagePaymentData.css';

const ManagePaymentData = () => {
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [bankName, setBankName] = useState('');
  const [upiId, setUpiId] = useState('');
  const [qrCode, setQrCode] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('accountName', accountName);
    formData.append('accountNumber', accountNumber);
    formData.append('ifscCode', ifscCode);
    formData.append('bankName', bankName);
    formData.append('upiId', upiId);
    if (qrCode) formData.append('qrCode', qrCode); // Ensure qrCode is properly appended

    try {
      const response = await axiosInstance.post('/payment/upload', formData); // Using axiosInstance
      console.log('Payment details saved:', response.data);
    } catch (error) {
      console.error('Error saving payment details:', error);
    }
  };

  return (
    <div className="payment-container">
      <h2>Manage Payment Data</h2>

      <form onSubmit={handleSubmit}>
        {/* Upload QR Code and UPI Section */}
        <div className="row">
          <div className="section">
            <label htmlFor="upload-qr">Upload QR Code:</label>
            <input
              type="file"
              id="upload-qr"
              name="qrCode"
              accept="image/*"
              onChange={(e) => setQrCode(e.target.files[0])}
            />
          </div>
          <div className="section">
            <label htmlFor="upi-id">Manage UPI:</label>
            <input
              type="text"
              id="upi-id"
              name="upiId"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="Enter UPI ID"
            />
          </div>
        </div>

        {/* Manage Account Details Section */}
        <div className="row">
          <div className="section">
            <label htmlFor="account-name">Account Name:</label>
            <input
              type="text"
              id="account-name"
              name="accountName"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="Enter Account Name"
            />
          </div>
          <div className="section">
            <label htmlFor="account-no">Account Number:</label>
            <input
              type="text"
              id="account-no"
              name="accountNumber"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Enter Account Number"
            />
          </div>
        </div>

        <div className="row">
          <div className="section">
            <label htmlFor="ifsc-code">IFSC Code:</label>
            <input
              type="text"
              id="ifsc-code"
              name="ifscCode"
              value={ifscCode}
              onChange={(e) => setIfscCode(e.target.value)}
              placeholder="Enter IFSC Code"
            />
          </div>
          <div className="section">
            <label htmlFor="bank-name">Bank Name:</label>
            <input
              type="text"
              id="bank-name"
              name="bankName"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="Enter Bank Name"
            />
          </div>
        </div>

        <div className="button-container">
          <button className="save-button" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManagePaymentData;
