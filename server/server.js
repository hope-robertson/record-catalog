const express = require('express')
const knex = require('knex')

const app = express()
const port = 3000

// Configure Knex.js
const knexConfig = require('./knexfile')
const db = knex(knexConfig.development)

// Middleware (if needed)
app.use(express.json()) // Parse JSON request bodies

// Example route (to be expanded later)
app.get('/', (req, res) => {
  res.send('Welcome to the Record Shop Inventory API!')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
