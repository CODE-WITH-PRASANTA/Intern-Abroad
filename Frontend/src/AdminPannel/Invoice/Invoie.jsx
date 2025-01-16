import React, { useState } from 'react';
import jsPDF from 'jspdf';
import './Invoice.css';

const InvoiceGenerator = () => {
  const [items, setItems] = useState([{ id: '', name: '', from: '', to: '', amount: 0 }]);
  const [invoiceData, setInvoiceData] = useState({
    invoiceNo: '',
    invoiceDate: '',
    dueDate: '',
    accountName: '',
    bankDetails: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientAddress: '',
    gst: 0,
  });

  const handleItemChange = (index, event) => {
    const values = [...items];
    values[index][event.target.name] = event.target.value;
    setItems(values);
  };

  const addItem = () => {
    setItems([...items, { id: '', name: '', from: '', to: '', amount: 0 }]);
  };

  const removeItem = (index) => {
    const values = [...items];
    values.splice(index, 1);
    setItems(values);
  };

  const refreshForm = () => {
    setInvoiceData({
      invoiceNo: '',
      invoiceDate: '',
      dueDate: '',
      accountName: '',
      bankDetails: '',
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      clientAddress: '',
      gst: 0,
    });
    setItems([{ id: '', name: '', from: '', to: '', amount: 0 }]);
  };

  const calculateSubtotal = () => items.reduce((total, item) => total + Number(item.amount), 0);

  const calculateTotal = () => calculateSubtotal() + Number(invoiceData.gst);

  const generatePDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4');

    // Colors
    const headerColor = [23, 62, 117];
    const whiteColor = [255, 255, 255];
    const blackColor = [0, 0, 0];
    const grayColor = [240, 240, 240];

    // Header
    doc.setFillColor(...headerColor);
    doc.rect(0, 0, 210, 30, 'F');
    doc.setTextColor(...whiteColor);
    doc.setFontSize(18);
    doc.text('INTERN ABROAD', 10, 15);
    doc.setFontSize(12);
    doc.text('INVOICE', 200, 15, { align: 'right' });

    // Logo Placeholder
    doc.setFillColor(255, 255, 255);
    doc.rect(160, 5, 40, 20, 'F');
    doc.setTextColor(...blackColor);
    doc.setFontSize(8);
    doc.text('Your Logo Here', 180, 15, { align: 'center' });

    // Invoice Info Section
    doc.setFontSize(12);
    doc.text(`Invoice No: ${invoiceData.invoiceNo}`, 10, 40);
    doc.text(`Invoice Date: ${invoiceData.invoiceDate}`, 10, 48);
    doc.text(`Due Date: ${invoiceData.dueDate}`, 10, 56);

    // Client Info Section
    doc.setFontSize(10);
    doc.text('Bill To:', 10, 70);
    doc.text(`${invoiceData.clientName}`, 10, 76);
    doc.text(`${invoiceData.clientAddress}`, 10, 82);
    doc.text(`${invoiceData.clientEmail}`, 10, 88);
    doc.text(`${invoiceData.clientPhone}`, 10, 94);

    // Payment Info Section
    doc.text('Payment Information:', 140, 70);
    doc.text(`Bank: ${invoiceData.bankDetails}`, 140, 76);
    doc.text(`Account Name: ${invoiceData.accountName}`, 140, 82);

    // Table Header
    let startY = 100;
    doc.setFillColor(...headerColor);
    doc.setTextColor(...whiteColor);
    doc.rect(10, startY, 190, 10, 'F');
    doc.text('ID', 12, startY + 7);
    doc.text('DESCRIPTION', 50, startY + 7);
    doc.text('FROM', 100, startY + 7);
    doc.text('TO', 130, startY + 7);
    doc.text('AMOUNT ()', 180, startY + 7, { align: 'right' });

    // Table Content
    startY += 10;
    doc.setFontSize(10);
    doc.setTextColor(...blackColor);
    items.forEach((item, index) => {
      const rowY = startY + index * 10;
      const fillColor = index % 2 === 0 ? grayColor : [255, 255, 255];
      doc.setFillColor(...fillColor);
      doc.rect(10, rowY, 190, 10, 'F');
      doc.text(`${item.id}`, 12, rowY + 7);
      doc.text(`${item.name}`, 50, rowY + 7);
      doc.text(`${item.from}`, 100, rowY + 7);
      doc.text(`${item.to}`, 130, rowY + 7);
      doc.text(`${parseFloat(item.amount).toFixed(2)}`, 180, rowY + 7, { align: 'right' });
    });

    // Totals Section
    startY += items.length * 10 + 10;
    doc.setFontSize(12);
    doc.text('Subtotal:', 140, startY);
    doc.text(`${calculateSubtotal().toFixed(2)}`, 180, startY, { align: 'right' });
    startY += 8;
    doc.text('GST:', 140, startY);
    doc.text(`${Number(invoiceData.gst).toFixed(2)}`, 180, startY, { align: 'right' });
    startY += 8;
    doc.setFontSize(14);
    doc.setTextColor(...headerColor);
    doc.text('TOTAL:', 140, startY);
    doc.text(`${calculateTotal().toFixed(2)}`, 180, startY, { align: 'right' });

    // Footer
    startY += 20;
    doc.setFontSize(10);
    doc.text('Terms and Conditions:', 10, startY);
    doc.text('Payment is due within 30 days of the invoice date.', 10, startY + 6);
    doc.text('Thank you for your business!', 10, startY + 12);

    // Save PDF
    doc.save(`Invoice-${invoiceData.invoiceNo}.pdf`);
  };

  return (
    <div className="invoice-container">
      <h1>Invoice Generator</h1>

      <div className="invoice-details">
        <input
          type="text"
          placeholder="Invoice No"
          value={invoiceData.invoiceNo}
          onChange={(e) => setInvoiceData({ ...invoiceData, invoiceNo: e.target.value })}
        />
        <input
          type="date"
          value={invoiceData.invoiceDate}
          onChange={(e) => setInvoiceData({ ...invoiceData, invoiceDate: e.target.value })}
        />
        <input
          type="date"
          value={invoiceData.dueDate}
          onChange={(e) => setInvoiceData({ ...invoiceData, dueDate: e.target.value })}
        />
      </div>

      <div className="client-info">
        <h3>Client Information</h3>
        <input
          type="text"
          placeholder="Name"
          value={invoiceData.clientName}
          onChange={(e) => setInvoiceData({ ...invoiceData, clientName: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={invoiceData.clientEmail}
          onChange={(e) => setInvoiceData({ ...invoiceData, clientEmail: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          value={invoiceData.clientPhone}
          onChange={(e) => setInvoiceData({ ...invoiceData, clientPhone: e.target.value })}
        />
        <textarea
          placeholder="Address"
          value={invoiceData.clientAddress}
          onChange={(e) => setInvoiceData({ ...invoiceData, clientAddress: e.target.value })}
        />
      </div>

      <div className="payment-info">
        <h3>Payment Information</h3>
        <input
          type="text"
          placeholder="Bank"
          value={invoiceData.bankDetails}
          onChange={(e) => setInvoiceData({ ...invoiceData, bankDetails: e.target.value })}
        />
        <input
          type="text"
          placeholder="Account Name"
          value={invoiceData.accountName}
          onChange={(e) => setInvoiceData({ ...invoiceData, accountName: e.target.value })}
        />
      </div>

      <div className="items-section">
        <h3>Item Details</h3>
        {items.map((item, index) => (
          <div key={index} className="item-row">
            <input
              type="text"
              name="id"
              placeholder="ID"
              value={item.id}
              onChange={(e) => handleItemChange(index, e)}
            />
            <input
              type="text"
              name="name"
              placeholder="Description"
              value={item.name}
              onChange={(e) => handleItemChange(index, e)}
            />
            <input
              type="text"
              name="from"
              placeholder="From"
              value={item.from}
              onChange={(e) => handleItemChange(index, e)}
            />
            <input
              type="text"
              name="to"
              placeholder="To"
              value={item.to}
              onChange={(e) => handleItemChange(index, e)}
            />
            <input
              type="number"
              name="amount"
              placeholder=" Amount"
              value={item.amount}
              onChange={(e) => handleItemChange(index, e)}
            />
            <button onClick={() => removeItem(index)}>Remove</button>
          </div>
        ))}
        <button onClick={addItem}>Add Item</button>
      </div>

      <div className="total-section">
        <p>Subtotal: {calculateSubtotal().toFixed(2)}</p>
        <input
          type="number"
          placeholder="Enter  GST"
          value={invoiceData.gst}
          onChange={(e) => setInvoiceData({ ...invoiceData, gst: e.target.value })}
        />
        <p>Total: {calculateTotal().toFixed(2)}</p>
      </div>

      <div className="button-section">
        <button onClick={generatePDF}>Download PDF</button>
        <button onClick={refreshForm}>Refresh</button>
      </div>
    </div>
  );
};

export default InvoiceGenerator;
