import React, { useState, useEffect } from "react";
import axiosInstance from "../../Utils/Api"; // Import axiosInstance
import Swal from "sweetalert2"; // Import Swal
import "./VirtualPayment.css";

const VirtualPayment = ({ formData, setFormData }) => {
  const [utrNo, setUtrNo] = useState(formData.utrNo || "");
  const [paymentMethod, setPaymentMethod] = useState(formData.paymentMethod || "");
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch payment details from the backend using axiosInstance
    axiosInstance
      .get("/payment/payment-details") // Use the relative URL since the base URL is set in axiosInstance
      .then((response) => {
        setPaymentDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching payment details:", error);
      });
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

  const handleSubmitApplication = async () => {
    if (!utrNo || !paymentMethod) {
      alert("Please select a payment method and enter the UTR/Transaction ID.");
      return;
    }

    // SweetAlert2 confirmation dialog
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, submit it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          const fullApplicationData = { ...formData, utrNo, paymentMethod };

          try {
            const response = await axiosInstance.post("/internships/apply", fullApplicationData); // Use the relative URL
            if (response.status === 201) {
              swalWithBootstrapButtons.fire({
                title: "Submitted!",
                text: "Your application has been submitted successfully.",
                icon: "success",
              });
              // Optionally, reset the form
              setFormData({
                day: "",
                month: "",
                year: "",
                gender: "",
                phone: "",
                email: "",
                name: "",
                nationality: "",
                address: "",
                internshipType: "",
                selectedIndustries: [],
                location: "",
                internshipLength: "",
                courses: [],
                internshipStartDate: "",
                internshipDetails: "",
                utrNo: "",
                paymentMethod: "",
              });
            } else {
              swalWithBootstrapButtons.fire({
                title: "Failed!",
                text: "Application submission failed. Please try again.",
                icon: "error",
              });
            }
          } catch (error) {
            console.error("Error submitting the application:", error);
            swalWithBootstrapButtons.fire({
              title: "Error!",
              text: "An error occurred while submitting the application. Please try again later.",
              icon: "error",
            });
          } finally {
            setLoading(false);
          }
        } else {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your application has not been submitted.",
            icon: "error",
          });
        }
      });
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      utrNo,
      paymentMethod,
    }));
  }, [utrNo, paymentMethod, setFormData]);

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
                <img src={paymentDetails.qrCodeUrl} alt="QR Code" className="qr-code-image" />
              ) : (
                <p>Loading QR Code...</p>
              )}
              <button onClick={handleDownload} className="button-download-qr">
                Download QR Code
              </button>
            </div>
            <div className="qr-code-actions">
              <span className="upi-id">UPI ID: {paymentDetails?.upiId || "Loading..."}</span>
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
                      <span className="account-info-value">{paymentDetails.accountName}</span>
                      <button
                        onClick={() => handleCopy(paymentDetails.accountName)}
                        className="copy-button"
                      >
                        Copy
                      </button>
                    </div>
                    <div className="account-detail">
                      <span className="account-info-label">Account No.:</span>
                      <span className="account-info-value">{paymentDetails.accountNumber}</span>
                      <button
                        onClick={() => handleCopy(paymentDetails.accountNumber)}
                        className="copy-button"
                      >
                        Copy
                      </button>
                    </div>
                    <div className="account-detail">
                      <span className="account-info-label">IFSC Code:</span>
                      <span className="account-info-value">{paymentDetails.ifscCode}</span>
                      <button
                        onClick={() => handleCopy(paymentDetails.ifscCode)}
                        className="copy-button"
                      >
                        Copy
                      </button>
                    </div>
                    <div className="account-detail">
                      <span className="account-info-label">Bank Name:</span>
                      <span className="account-info-value">{paymentDetails.bankName}</span>
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
                onClick={handleSubmitApplication}
                className="button-submit"
                disabled={loading}
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

export default VirtualPayment;
