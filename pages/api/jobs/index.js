import executeQuery from '../db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Handle GET logic to fetch all jobs
    try {
      const jobs = await executeQuery({
        query: 'SELECT * FROM jobs',
        values: [],
      });
      res.status(200).json(jobs); // Send response for GET
    } catch (error) {
      console.error('Error fetching jobs:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    // Handle POST logic to create a new job
    const { title, description, company, location } = req.body;

    try {
      // Insert job into the database, including category and posted_at
      const result = await executeQuery({
        query: 'INSERT INTO jobs (title, description, company, location, category, posted_at) VALUES (?, ?, ?, ?, ?, NOW())',
        values: [title, description, company, location, 'Technology'], // You can change 'Technology' to another category if needed
      });
      res.status(201).json({ message: 'Job posted successfully', jobId: result.insertId });
    } catch (error) {
      console.error('Error posting job:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    // Handle unsupported methods
    res.status(405).json({ message: 'Method not allowed' });
  }
}
