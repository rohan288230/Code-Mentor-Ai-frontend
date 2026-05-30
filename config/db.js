const mongoose = require('mongoose');
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
dns.setDefaultResultOrder('ipv4first');

const { MONGO_OPTIONS } = require('../constants/mongoOptions');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb+srv://rohansinghramola2212_db_user:rohan123@cluster0.rww4n8e.mongodb.net/code_mentor_ai?retryWrites=true&w=majority';

    console.log('--- MongoDB Connection Config ---');
    console.log('Using URI:', mongoUri.split('@')[1] || mongoUri); // log safely
    
    if (mongoose.connection.readyState === 1) {
      console.log('MongoDB already connected');
      return;
    }

    console.log('Attempting to connect to MongoDB Atlas...');
    const conn = await mongoose.connect(mongoUri, {
      ...MONGO_OPTIONS,
      serverSelectionTimeoutMS: 5000 // fail fast if network error
    });
    console.log(`MongoDB Connected successfully to: ${conn.connection.host}`);

    if (mongoose.connection.listenerCount('error') === 0) {
      mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error after initial connection:', err.message);
      });
    }
  } catch (error) {
    console.error('Database Connection Failed! ❌');
    console.error(`Error details: ${error.message}`);
    
    // Optional fallback logic if DNS/SRV totally fails
    if (error.message.includes('ECONNREFUSED') || error.message.includes('querySrv')) {
      console.log('DNS/SRV lookup failed. You might need to use standard mongodb:// instead of mongodb+srv:// or check your network/firewall.');
    }
    
    process.exit(1);
  }
};

module.exports = connectDB;
