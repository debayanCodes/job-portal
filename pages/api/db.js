import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: 'sql12.freemysqlhosting.net',
  user: 'sql12735817',
  password: 'l4KUhKTrs4',
  database: 'sql12735817', // Ensure this is set to the new database name
  port: 3306, // Specify the port number
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
