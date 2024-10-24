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
app.get('/api/patients', (req, res) => {
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients;'
    connection.query(query,(error,results) => {
      if (error) {
        return res.status(500).json({error: 'Error fetching database'})
      }
      res.json(results);
    })
})

// Question 2 goes here
app.get('/api/providers', (req, res) => {
  const query = 'SELECT first_name, last_name, provider_specialty FROM providers limit 5;'
  connection.query(query,(error,results) => {
    if (error) {
      return res.status(500).json({error: 'Error fetching database'})
    }
    res.json(results);
  })
})

// Question 3 goes here

app.get('/api/patient', (req, res) => {
  const { first_name } = req.query;  // Get the first_name query parameter
  
  if (!first_name) {
    return res.status(400).json({ error: 'Please provide a first_name query parameter' });
  }

  const query = 'SELECT * FROM patients WHERE first_name = ?';

  connection.query(query, [first_name], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Error fetching data from the database' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'No patients found with the given first name' });
    }
    res.json(results);  // Send back the filtered patients
  });
});

// Question 4 goes here

app.get('/api/provider', (req, res) => {
  const {specialty} = req.query;
  if (!specialty) {
    return res.status(400).json({error: 'Please provide a specialty query parameter'});
  }

  const query = 'SELECT * FROM providers WHERE provider_specialty = ?';

  connection.query(query, [specialty], (error, results) => {
    if (error) {
      return res.status(500).json({error: 'Error fetching data from the database'});
    }
    if (results.length === 0) {
      return res.status(404).json({message: 'No patients found with the given first name'})
    }
    res.json(results);

  })
})


// listen to the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`)
})