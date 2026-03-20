import React, { useEffect, useState } from 'react';
import NewsletterCard from '../components/NewsletterCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { fetchNewsletters } from '../services/api';
import { Newsletter } from '../types';

const HomePage: React.FC = () => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getNewsletters = async () => {
      try {
        setIsLoading(true);
        const data = await fetchNewsletters();
        setNewsletters(data);
      } catch (err) {
        console.error('Error fetching newsletters:', err);
        setError('Failed to load newsletters. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    getNewsletters();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (newsletters.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-600">No newsletters available at the moment.</p>
        <p className="text-md text-gray-500 mt-2">Please check back soon!</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Latest Newsletters</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {newsletters.map((newsletter) => (
          <NewsletterCard key={newsletter.id} newsletter={newsletter} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;