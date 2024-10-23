const express = require('express')
const app = express()
const mysql = require('mysql2');
const dotenv = require('dotenv').config();


const connection = mysql.createConnection({
    host: process.env.DB_HOST, // Database server location
  user: process.env.DB_USERNAME, // Your database username
  password: process.env.DB_PASSWORD, // Your database password
  database: process.env.DB_NAME // The name of your database
});

connection.connect((err) => {
    if (err) {
      console.error('Error connecting: ' + err.stack); // Log error if connection fails
      return;
    }
    console.log('Connected as id ' + connection.threadId); // Log success message with connection ID
  });
  
// Question 1 goes here


// Question 2 goes here


// Question 3 goes here


// Question 4 goes here



// listen to the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`)
})