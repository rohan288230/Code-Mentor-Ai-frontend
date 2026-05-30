require('dotenv').config({ path: __dirname + '/../.env' });
const connectDB = require('../config/db');
const User = require('../models/User');

const makeAdmin = async (email) => {
  await connectDB();
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`User with email ${email} not found.`);
      process.exit(1);
    }
    user.role = 'admin';
    await user.save();
    console.log(`Successfully upgraded ${email} to admin!`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

const emailArg = process.argv[2];
if (!emailArg) {
  console.log("Please provide an email address. Usage: node makeAdmin.js <email>");
  process.exit(1);
}

makeAdmin(emailArg);
