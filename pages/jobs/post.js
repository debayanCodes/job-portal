import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useAuth } from '../../contexts/AuthContext';

export default function PostJob() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');
    const [showDialog, setShowDialog] = useState(false);  // State to handle dialog visibility
    const router = useRouter();
    const { user, loading } = useAuth();

    // Check if user is an employer on initial load
    useEffect(() => {
        if (!loading && user) {
            if (user.role !== 'employer') {
                // Show dialog box for employees
                setShowDialog(true);
            }
        } else if (!loading && !user) {
            // Redirect unauthenticated users to login page
            router.push('/auth/login');
        }
    }, [user, loading, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Ensure user is an employer before submitting the job
        if (!user || user.role !== 'employer') {
            setError('Only employers can post jobs');
            return;
        }

        try {
            const res = await fetch('/api/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description, company, location }),
            });

            if (res.ok) {
                router.push('/jobs');
            } else {
                const errorData = await res.json();
                setError(errorData.message);
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    // Function to close dialog and redirect employee
    const handleCloseDialog = () => {
        setShowDialog(false);
        router.push('/');
    };

    if (loading) {
        return <Layout><div>Loading...</div></Layout>;
    }

    return (
        <Layout>
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Post a New Job</h1>

                {user && (
                    <p className="mb-4">Logged in as: {user.role === 'employer' ? 'Employer' : 'Employee'}</p>
                )}

                {error && <p className="text-red-500 mb-4">{error}</p>}

                {/* Display modal dialog if the user is an employee */}
                {showDialog && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded shadow-lg">
                            <h2 className="text-lg font-bold mb-4">Access Restricted</h2>
                            <p>You are logged in as an <strong>employee</strong>. You need to be an employer to post jobs.</p>
                            <button
                                onClick={handleCloseDialog}
                                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            >
                                Go Back
                            </button>
                        </div>
                    </div>
                )}

                {/* If user is allowed, display the job posting form */}
                {!showDialog && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block mb-1">Job Title</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block mb-1">Description</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div>
                            <label htmlFor="company" className="block mb-1">Company</label>
                            <input
                                type="text"
                                id="company"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                required
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div>
                            <label htmlFor="location" className="block mb-1">Location</label>
                            <input
                                type="text"
                                id="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                            Post Job
                        </button>
                    </form>
                )}
            </div>
        </Layout>
    );
}
