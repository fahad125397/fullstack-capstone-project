const express = require('express');
const router = express.Router();

// Import the database connection method from db.js
const { connectToDatabase } = require('./db'); 

// 1. Route serving the "/api/gifts" endpoint
router.get('/api/gifts', async (req, res) => {
  try {
    // Connect to the database using the required method
    const db = await connectToDatabase();
    const collection = db.collection('gifts'); // Make sure this matches your MongoDB collection name
    
    // Retrieve all items
    const gifts = await collection.find({}).toArray();
    res.status(200).json(gifts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching gifts", error });
  }
});

// 2. Route serving the "/api/gifts/:id" endpoint
router.get('/api/gifts/:id', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('gifts');
    
    // Depending on your data, you might need to parse the ID. 
    // If your MongoDB uses standard ObjectIds, you would use new ObjectId(req.params.id)
    const giftId = parseInt(req.params.id); 
    
    // Locate the specific item
    const gift = await collection.findOne({ id: giftId });
    
    if (gift) {
      res.status(200).json(gift);
    } else {
      res.status(404).json({ message: "Gift not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching gift details", error });
  }
});

module.exports = router;
