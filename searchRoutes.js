const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('./db'); 

// Route to search/filter items based on a category query parameter
router.get('/api/search', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('gifts'); 
    
    // Extract the 'category' parameter from the URL query string
    const queryCategory = req.query.category;
    
    // Initialize an empty query object
    let query = {};
    
    // If the user provided a category, add it to our MongoDB query filter
    if (queryCategory) {
      // This will look for items where the 'category' field matches the query exactly
      query.category = queryCategory; 
      
      // Note: If you want to make it case-insensitive, you could use a regular expression instead:
      // query.category = { $regex: queryCategory, $options: "i" };
    }
    
    // Execute the query to find matching items
    const results = await collection.find(query).toArray();
    
    if (results.length > 0) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ message: "No items found matching that category" });
    }
    
  } catch (error) {
    res.status(500).json({ message: "Error performing search", error });
  }
});

module.exports = router;
