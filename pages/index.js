import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="text-center py-16 bg-blue-100">
        <h1 className="text-5xl font-bold mb-4">Welcome to Job Portal</h1>
        <p className="text-2xl mb-8">Find your dream job or post a job opening</p>
        <div className="space-x-4">
          <Link href="/jobs" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Browse Jobs
          </Link>
          <Link href="/jobs/post" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Post a Job
          </Link>
        </div>
      </div>

      {/* About Section */}
      <div className="py-16 bg-gray-100">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">Why Choose Us?</h2>
          <p className="text-lg text-gray-700 mb-8">
            We connect job seekers with employers in the most efficient way. Whether you're a candidate looking for a 
            new opportunity or a company in need of talent, our platform is the right place for you.
          </p>
          <div className="flex justify-center space-x-12">
            <div className="max-w-sm">
              <Image src="/images/job_search.jpg" alt="Job Search" width={300} height={200} className="rounded-lg shadow-md" />
              <h3 className="text-xl font-semibold mt-4">Wide Range of Jobs</h3>
              <p className="text-gray-600 mt-2">Explore thousands of job opportunities across various industries.</p>
            </div>
            <div className="max-w-sm">
              <Image src="/images/employer.jpg" alt="Employer" width={300} height={200} className="rounded-lg shadow-md" />
              <h3 className="text-xl font-semibold mt-4">Find the Right Talent</h3>
              <p className="text-gray-600 mt-2">Post job openings and reach top talent with just a few clicks.</p>
            </div>
            <div className="max-w-sm">
              <Image src="/images/interview.jpg" alt="Interview" width={300} height={200} className="rounded-lg shadow-md" />
              <h3 className="text-xl font-semibold mt-4">Grow Your Career</h3>
              <p className="text-gray-600 mt-2">Take your career to the next level with our career resources.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">What Our Users Say</h2>
          <div className="space-y-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <p className="text-xl text-gray-800">"This platform helped me land my dream job within a week! The process was so smooth and the options were endless."</p>
              <p className="mt-4 text-gray-600">- Alex Johnson, Software Engineer</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <p className="text-xl text-gray-800">"As an employer, I found the best candidates quickly. It's easy to use and has a lot of helpful features."</p>
              <p className="mt-4 text-gray-600">- Sarah Williams, HR Manager</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-16 bg-green-100">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">Get Started Today!</h2>
          <p className="text-lg text-gray-700 mb-8">
            Whether you're searching for your next career move or looking to hire the best talent, we're here to help.
          </p>
          <div className="space-x-4">
            <Link href="/jobs" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded">
              Browse Jobs
            </Link>
            <Link href="/jobs/post" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded">
              Post a Job
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
