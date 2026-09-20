const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Import the route files we created in Tasks 5 and 6
const giftRoutes = require('./giftRoutes');
const searchRoutes = require('./searchRoutes');

// Mount the routes to the app
app.use(giftRoutes);

// This line satisfies Task 7: It tells the app to serve the search routes
app.use(searchRoutes); 

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
