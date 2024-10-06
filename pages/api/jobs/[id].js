import executeQuery from '../db'

export default async function handler(req, res) {
  const { id } = req.query

  if (req.method === 'GET') {
    try {
      const jobs = await executeQuery({
        query: 'SELECT * FROM jobs WHERE id = ?',
        values: [id],
      })

      if (jobs.length === 0) {
        return res.status(404).json({ message: 'Job not found' })
      }

      res.status(200).json(jobs[0])
    } catch (error) {
      console.error('Error fetching job:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  } else if (req.method === 'PUT') {
    const { title, description, company, location } = req.body

    try {
      const result = await executeQuery({
        query: 'UPDATE jobs SET title = ?, description = ?, company = ?, location = ? WHERE id = ?',
        values: [title, description, company, location, id],
      })

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Job not found' })
      }

      res.status(200).json({ message: 'Job updated successfully' })
    } catch (error) {
      console.error('Error updating job:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  } else if (req.method === 'DELETE') {
    try {
      const result = await executeQuery({
        query: 'DELETE FROM jobs WHERE id = ?',
        values: [id],
      })

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Job not found' })
      }

      res.status(200).json({ message: 'Job deleted successfully' })
    } catch (error) {
      console.error('Error deleting job:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}