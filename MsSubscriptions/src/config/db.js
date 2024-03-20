const mongoose = require('mongoose');

string_connection_bd = process.env.STRING_CONNECT_BD

async function connectToDatabase() {
  try {
    await mongoose.connect(string_connection_bd);
    console.log('Connection to the database established correctly.');
  } catch (error) {
    console.error('Error to connect the database:', error);
    throw new Error('Error to connect the database!');
  }
}

module.exports = connectToDatabase;