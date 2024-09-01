import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import User from '../models/User.js';

dotenv.config();
connectDB();

const setAdmin = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`User with email ${email} not found`);
      return;
    }
    user.isAdmin = true;
    await user.save();
    console.log(`User ${email} has been set as admin`);
  } catch (error) {
    console.error('Error setting admin:', error);
  }
};

const adminEmails = process.argv.slice(2);

if (adminEmails.length === 0) {
  console.log('Usage: node scripts/setAdmin.js <email1> <email2> ...');
  process.exit(1);
}

const setAdmins = async () => {
  for (let email of adminEmails) {
    await setAdmin(email.trim());
  }
  process.exit();
};

setAdmins();