import express from 'express'; // Imports the Express module
import fetch from 'node-fetch'; // Imports the node-fetch module for making HTTP requests

const app = express(); // Creates an Express application
const port = 3000; // Sets the port to 3000

const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD'; // URL of the API to fetch exchange rates, you can change it to your API

app.use(express.static('public')); // Serves static files from the "public" directory

// Defines a GET route for "/api/rates"
app.get('/api/rates', async (req, res) => {
    try {
        const response = await fetch(API_URL); // Makes a request to the API
        const data = await response.json(); // Reads the response and converts it to JSON
        res.json(data); // Sends the JSON data to the client
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' }); // Sends a 500 error code and error message if something went wrong
    }
});

app.listen(port, () => { // Starts the server on the specified port
    console.log(`Server running at http://localhost:${port}`); // Logs a message indicating that the server is running
});
