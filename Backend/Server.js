const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const pricingRoutes = require('./routes/pricingRoutes');
const postRoutes = require('./routes/post');
const teamRoutes = require('./routes/teamRoutes');
const courseRoutes = require('./routes/courseRoutes');
const industryRoutes = require('./routes/industryRoutes');
const countryRoutes = require('./routes/countryRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require("./routes/authRoutes");
const paymentRoutes = require('./routes/paymentRoutes'); // Import payment routes
const internshipRoutes = require('./routes/internshipRoutes'); // Import payment routes
const formRoutes = require('./routes/SubmitPaymentRoute');
const adminloginRoutes = require('./routes/adminloginRoutes');
const workingMemberRoutes = require('./routes/WorkingMemberRoutes');
const phoneRoutes = require('./routes/phoneRoutes');



dotenv.config(); // Load environment variables

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/posts', postRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/pricing', pricingRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/industries', industryRoutes);
app.use('/api/countries', countryRoutes);
app.use('/api/contact', contactRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/form', formRoutes);
app.use('/api/admin', adminloginRoutes);
app.use('/api/working-members', workingMemberRoutes);
app.use('/api/managephone', phoneRoutes);


// Home Route
app.get("/", (req, res) => {
  res.send("API is running...");
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));