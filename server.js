const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Start server
app.listen(port, '0.0.0.0', () => {
    console.log(`Game server running at http://localhost:${port}`);
});
