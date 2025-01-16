import React, { useState, useEffect } from "react";
import axiosInstance from '../../Utils/Api'; // Import axiosInstance
import Swal from 'sweetalert2'; // Import Swal
import "./Payment.css";

const Payment = () => {
  const [utrNo, setUtrNo] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch payment details from the backend using axiosInstance
    axiosInstance
      .get("/payment/payment-details")
      .then((response) => {
        setPaymentDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching payment details:", error);
      });

    // Load UTR, payment method, and form data from localStorage
    const savedUTR = localStorage.getItem("utrNo");
    const savedPaymentMethod = localStorage.getItem("paymentMethod");
    const savedFormData = JSON.parse(localStorage.getItem("internshipFormData"));

    if (savedUTR) setUtrNo(savedUTR);
    if (savedPaymentMethod) setPaymentMethod(savedPaymentMethod);

    if (!savedFormData) {
      alert("No form data found! Please complete the internship form.");
      window.location.href = "/"; // Redirect to form page
    }
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const handleDownload = () => {
    if (paymentDetails && paymentDetails.qrCodeUrl) {
      const link = document.createElement("a");
      link.href = paymentDetails.qrCodeUrl;
      link.download = "QR_Code.png";
      link.click();
    }
  };

  const handleSubmit = async () => {
    if (!utrNo || !paymentMethod) {
      alert("Please fill in both UTR/Transaction ID and Payment Method.");
      return;
    }

    // Show Swal confirmation dialog
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, submit payment!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);

          try {
            const internshipData = JSON.parse(localStorage.getItem("internshipFormData"));

            // Save UTR and payment method to localStorage
            localStorage.setItem("utrNo", utrNo);
            localStorage.setItem("paymentMethod", paymentMethod);

            // Send data to the backend using axiosInstance
            await axiosInstance.post("/form/submit", {
              utrNo,
              paymentMethod,
              ...internshipData,
            });

            swalWithBootstrapButtons.fire({
              title: "Submitted!",
              text: "Payment details submitted successfully.",
              icon: "success"
            });

            localStorage.clear(); // Clear data after submission
          } catch (error) {
            console.error("Error submitting payment details:", error);
            swalWithBootstrapButtons.fire({
              title: "Failed!",
              text: "Failed to submit payment details. Please try again.",
              icon: "error"
            });
          } finally {
            setLoading(false);
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your payment details are safe.",
            icon: "error"
          });
        }
      });
  };

  return (
    <div className="virtual-payment-wrapper">
      <div className="virtual-payment-header">
        <h1>Virtual Payment Portal</h1>
        <p>Secure your payment using our virtual portal</p>
      </div>

      <div className="virtual-payment-content">
        <div className="payment-sections">
          {/* Left Column */}
          <div className="payment-column-left">
            {/* QR Code Section */}
            <div className="qr-code-section">
              {paymentDetails?.qrCodeUrl ? (
                <img
                  src={paymentDetails.qrCodeUrl}
                  alt="QR Code"
                  className="qr-code-image"
                />
              ) : (
                <p>Loading QR Code...</p>
              )}
              <button onClick={handleDownload} className="button-download-qr">
                Download QR Code
              </button>
            </div>
            <div className="qr-code-actions">
              <span className="upi-id">
                UPI ID: {paymentDetails?.upiId || "Loading..."}
              </span>
              <button
                onClick={() => handleCopy(paymentDetails?.upiId || "")}
                className="button-copy-upi"
              >
                Copy
              </button>
            </div>

            {/* Account Info Section */}
            <div className="account-info-section">
              <h2 className="section-heading">Account Details</h2>
              <div className="account-details-box">
                {paymentDetails ? (
                  <>
                    <div className="account-detail">
                      <span className="account-info-label">Account Name:</span>
                      <span className="account-info-value">
                        {paymentDetails.accountName}
                      </span>
                      <button
                        onClick={() => handleCopy(paymentDetails.accountName)}
                        className="copy-button"
                      >
                        Copy
                      </button>
                    </div>
                    <div className="account-detail">
                      <span className="account-info-label">Account No.:</span>
                      <span className="account-info-value">
                        {paymentDetails.accountNumber}
                      </span>
                      <button
                        onClick={() => handleCopy(paymentDetails.accountNumber)}
                        className="copy-button"
                      >
                        Copy
                      </button>
                    </div>
                    <div className="account-detail">
                      <span className="account-info-label">IFSC Code:</span>
                      <span className="account-info-value">
                        {paymentDetails.ifscCode}
                      </span>
                      <button
                        onClick={() => handleCopy(paymentDetails.ifscCode)}
                        className="copy-button"
                      >
                        Copy
                      </button>
                    </div>
                    <div className="account-detail">
                      <span className="account-info-label">Bank Name:</span>
                      <span className="account-info-value">
                        {paymentDetails.bankName}
                      </span>
                    </div>
                  </>
                ) : (
                  <p>Loading account details...</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="payment-column-right">
            <div className="utr-input-section">
              <label htmlFor="utrNo" className="utr-label">
                Enter UTR/Transaction ID:
              </label>
              <input
                type="text"
                id="utrNo"
                className="utr-input"
                placeholder="Enter UTR/Transaction ID"
                value={utrNo}
                onChange={(e) => setUtrNo(e.target.value)}
              />

              <label htmlFor="paymentMethod" className="payment-method-label">
                Select Payment Method:
              </label>
              <select
                id="paymentMethod"
                className="payment-method-select"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="">Select</option>
                <option value="PhonePay">PhonePay</option>
                <option value="GooglePay">GooglePay</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="UPI">UPI</option>
              </select>

              <button
                className="button-submit"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Submitting..." : "Submit Payment"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
