import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  hhost: process.env.DB_HOST,         // Use environment variable for host
  user: process.env.DB_USER,         // Use environment variable for user
  password: process.env.DB_PASSWORD,  // Use environment variable for password
  database: process.env.DB_NAME,      // Use environment variable for database name
  port: process.env.DB_PORT,          // Use environment variable for port
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

export default async function executeQuery({ query, values = [] }) {
  try {
    const [results] = await pool.execute(query, values)
    return results
  } catch (error) {
    console.error('Database query error:', error)
    throw error
  }
}
