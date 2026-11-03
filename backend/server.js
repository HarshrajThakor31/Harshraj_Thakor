require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Initialize Postgres Client with cloud SSL support (Supabase, Neon, Railway)
const isLocal = !process.env.DATABASE_URL || process.env.DATABASE_URL.includes('localhost');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isLocal ? false : { rejectUnauthorized: false },
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle database client:', err.message);
  // Do NOT process.exit(-1), allowing pool to reconnect on next query
});

// Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend is running smoothly' });
});

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    const query = `
      INSERT INTO messages (name, email, message)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, created_at;
    `;
    const values = [name.trim(), email.trim().toLowerCase(), message.trim()];

    const result = await pool.query(query, values);

    res.status(200).json({
      success: true,
      message: 'Message delivered successfully!',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Contact endpoint error:', error);
    res.status(500).json({ error: 'Failed to deliver message. Please contact directly via email.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
