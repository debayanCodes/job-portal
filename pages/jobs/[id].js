import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useAuth } from '../../contexts/AuthContext'; // Assuming you have an auth context

export default function JobDetail() {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const { id } = router.query;

  const { user, loading: authLoading } = useAuth(); // Get user data and loading state from context

  useEffect(() => {
    if (id) {
      fetchJob();
    }
  }, [id]);

  const fetchJob = async () => {
    try {
      const res = await fetch(`/api/jobs/${id}`);
      if (res.ok) {
        const data = await res.json();
        setJob(data);
      } else {
        setError('Failed to fetch job details');
      }
    } catch (error) {
      setError('An error occurred while fetching job details');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (!user) {
      // Redirect to login if not logged in
      router.push('/auth/login');
    } else {
      // Proceed with the application process (e.g., email application)
      window.location.href = `mailto:apply@example.com?subject=Application for ${job.title}`;
    }
  };

  if (loading || authLoading) return <Layout><div>Loading...</div></Layout>;
  if (error) return <Layout><div>Error: {error}</div></Layout>;
  if (!job) return <Layout><div>Job not found</div></Layout>;

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
        <p className="text-xl text-gray-600 mb-2">{job.company}</p>
        <p className="text-lg text-gray-500 mb-4">{job.location}</p>
        <div className="bg-gray-100 p-4 rounded mb-4">
          <h2 className="text-xl font-semibold mb-2">Job Description</h2>
          <p className="whitespace-pre-wrap">{job.description}</p>
        </div>
        <button
          onClick={handleApply}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Apply for this job
        </button>
      </div>
    </Layout>
  );
}
