const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
dns.setDefaultResultOrder('ipv4first');
require('./config/env');

if (!process.env.GEMINI_API_KEY) {
  console.error("FATAL ERROR: GEMINI_API_KEY is not set. Exiting...");
  process.exit(1);
}

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');

// Import routes
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const adminCourseRoutes = require('./routes/adminCourseRoutes');
const dsaRoutes = require('./routes/dsaRoutes');
const aiRoutes = require('./routes/aiRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const interviewRoutes = require('./routes/interviewRoutes');
const networkInterviewRoutes = require('./routes/networkInterviewRoutes');
const adminNetworkRoutes = require('./routes/adminNetworkRoutes');
const systemDesignInterviewRoutes = require('./routes/systemDesignInterviewRoutes');
const adminSystemDesignRoutes = require('./routes/adminSystemDesignRoutes');
const dbmsInterviewRoutes = require('./routes/dbmsInterviewRoutes');
const adminDBMSRoutes = require('./routes/adminDBMSRoutes');
const osInterviewRoutes = require('./routes/osInterviewRoutes');
const adminOSRoutes = require('./routes/adminOSRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const { CLIENT_ORIGINS, DEFAULT_PORT } = require('./constants/appConstants');

const app = express();

app.set('trust proxy', 1);


// Connect to DB (Synchronous call to start the process, async inside)
connectDB();

// Middleware
app.use(helmet());
console.log("CORS CONFIG LOADED");
app.use(cors({
  origin: true, // Reflects the requesting origin dynamically
  credentials: true
}));
app.use(express.json());

// Rate Limiting
const rateLimit = require('express-rate-limit');
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 1000 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', apiLimiter);

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'code_mentor_ai_secret_123',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/admin', adminCourseRoutes);
app.use('/api/dsa', dsaRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/interview', interviewRoutes);
app.use('/api/interview/computer-networks', networkInterviewRoutes);
app.use('/api/admin/network', adminNetworkRoutes);
app.use('/api/interview/system-design', systemDesignInterviewRoutes);
app.use('/api/admin/system-design', adminSystemDesignRoutes);
app.use('/api/interview/dbms', dbmsInterviewRoutes);
app.use('/api/admin/dbms', adminDBMSRoutes);
app.use('/api/interview/os', osInterviewRoutes);
app.use('/api/admin/os', adminOSRoutes);

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', message: 'Code Mentor AI Backend Running' }));

app.get('/health/piston', async (req, res) => {
  try {
    const axios = require('axios');
    const url = (process.env.PISTON_URL || 'http://127.0.0.1:2000/api/v2/execute').replace('/execute', '/runtimes');
    const response = await axios.get(url, { timeout: 5000 });
    res.json({ status: 'ok', runtimes: response.data.length });
  } catch (err) {
    res.status(503).json({ status: 'error', message: 'Piston engine unavailable', error: err.message });
  }
});

// Global Error Handler
app.use(errorHandler);


const PORT = process.env.PORT || DEFAULT_PORT;
app.listen(PORT, () => {
  console.log(`Server started successfully.`);
  console.log(`Server running on port ${PORT}`);
  console.log(CLIENT_ORIGINS);
});

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Code Mentor AI Backend Running"
  });
});
