const { MongoClient } = require('mongodb');

// Connection URL (update this if your MongoDB is hosted elsewhere)
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function connectToDatabase() {
  try {
    // The exact line required by Task 4:
    await client.connect();
    
    console.log('Connected successfully to MongoDB server');
    
    // Select your database
    const db = client.db('capstone_database'); 
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

module.exports = { connectToDatabase, client };
