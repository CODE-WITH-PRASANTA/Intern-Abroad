import React, { useState, useEffect } from 'react';
import axiosInstance from '../../Utils/Api';
import './UpdaatePricing.css';

const UpdatePricing = () => {
  const [showForm, setShowForm] = useState(false);
  const [pricingData, setPricingData] = useState([]);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchPricingData();
  }, []);

  const fetchPricingData = async () => {
    try {
      const response = await axiosInstance.get('/pricing');
      setPricingData(response.data);
    } catch (error) {
      console.error('Error fetching pricing data:', error);
    }
  };

  const handlePublish = async (newPricing) => {
    try {
      if (editData) {
        await axiosInstance.put(`/pricing/${editData._id}`, newPricing);
      } else {
        await axiosInstance.post('/pricing', newPricing);
      }
      setShowForm(false);
      setEditData(null);
      fetchPricingData();
    } catch (error) {
      console.error('Error saving pricing data:', error);
    }
  };

  const handleEdit = (plan) => {
    setEditData(plan);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/pricing/${id}`);
      fetchPricingData();
    } catch (error) {
      console.error('Error deleting pricing plan:', error);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditData(null);
  };

  return (
    <div className="admin-pricing-container">
      <h1>Admin Panel - Manage Pricing</h1>

      <button className="add-pricing-btn" onClick={() => setShowForm(true)}>
        + Add Pricing
      </button>

      {showForm && (
        <>
          <div className="popup-overlay show" onClick={handleCloseForm}></div>
          <div className="pricing-popup show">
            <div className="popup-content">
              <h2>{editData ? 'Edit Pricing' : 'Add Pricing'}</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const newPricing = {
                    title: e.target.title.value,
                    facility: e.target.facility.value,
                    features: Array.from(e.target.features).map((input) => input.value),
                    pricing: e.target.pricing.value,
                    validTime: e.target.validTime.value,
                    yearlySave: e.target.yearlySave.value,
                    footerFacility: e.target.footerFacility.value,
                  };
                  handlePublish(newPricing);
                }}
              >
                <div className="form-grid">
                  <label>
                    Enter Title:
                    <input type="text" name="title" defaultValue={editData?.title || ''} required />
                  </label>
                  <label>
                    Enter Facility:
                    <input type="text" name="facility" defaultValue={editData?.facility || ''} required />
                  </label>
                  <label>
                    Add Features:
                    {Array(4)
                      .fill(null)
                      .map((_, i) => (
                        <input
                          key={i}
                          type="text"
                          name="features"
                          placeholder={`Feature ${i + 1}`}
                          defaultValue={editData?.features?.[i] || ''}
                        />
                      ))}
                  </label>
                  <label>
                    Add Pricing:
                    <input type="number" name="pricing" defaultValue={editData?.pricing || ''} required />
                  </label>
                  <label>
                    Valid Time:
                    <input type="text" name="validTime" defaultValue={editData?.validTime || ''} required />
                  </label>
                  <label>
                    Yearly Save Money:
                    <input type="number" name="yearlySave" defaultValue={editData?.yearlySave || ''} />
                  </label>
                  <label>
                    Enter Footer Facility:
                    <textarea name="footerFacility" defaultValue={editData?.footerFacility || ''}></textarea>
                  </label>
                </div>
                <div className="form-actions">
                  <button type="submit">Publish</button>
                  <button type="button" onClick={handleCloseForm}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      <div className="pricing-list">
        {pricingData.map((item) => (
          <div key={item._id} className="pricing-item">
            <h3>{item.title}</h3>
            <p>{item.facility}</p>
            <ul>
              {item.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <p>Pricing: {item.pricing}</p>
            <p>Valid Time: {item.validTime}</p>
            <p>Yearly Save: {item.yearlySave}</p>
            <p>Footer Facility: {item.footerFacility}</p>
            <div className="action-buttons">
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button onClick={() => handleDelete(item._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdatePricing;
