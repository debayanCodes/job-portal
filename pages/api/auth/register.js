import executeQuery from '../db'
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, email, password, role } = req.body

  if (!['employee', 'employer'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role' })
  }

  try {
    // Check if user already exists
    const existingUsers = await executeQuery({
      query: 'SELECT * FROM users WHERE email = ?',
      values: [email],
    })

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insert new user
    const result = await executeQuery({
      query: 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      values: [name, email, hashedPassword, role],
    })

    res.status(201).json({ message: 'User registered successfully', userId: result.insertId })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}