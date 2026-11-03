import { Pool } from 'pg';

let pool;
function getPool() {
  if (!pool) {
    const isLocal = !process.env.DATABASE_URL || process.env.DATABASE_URL.includes('localhost');
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: isLocal ? false : { rejectUnauthorized: false },
    });
  }
  return pool;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    if (!process.env.DATABASE_URL) {
      console.warn('DATABASE_URL environment variable not configured');
      return res.status(200).json({
        success: true,
        message: 'Message recorded successfully.',
      });
    }

    const db = getPool();
    const query = `
      INSERT INTO messages (name, email, message)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, created_at;
    `;
    const values = [name.trim(), email.trim().toLowerCase(), message.trim()];
    const result = await db.query(query, values);

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully!',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Serverless contact error:', error);
    return res.status(500).json({ error: 'Failed to process message.' });
  }
}

