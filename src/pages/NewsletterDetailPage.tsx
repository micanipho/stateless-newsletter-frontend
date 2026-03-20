import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchNewsletterById } from '../services/api';
import { Newsletter } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const NewsletterDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [newsletter, setNewsletter] = useState<Newsletter | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getNewsletterDetail = async () => {
      if (!id) {
        setError('Newsletter ID is missing.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const data = await fetchNewsletterById(id);
        if (data) {
          setNewsletter(data);
        } else {
          setError('Newsletter not found.');
        }
      } catch (err) {
        console.error('Error fetching newsletter detail:', err);
        setError('Failed to load newsletter content. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    getNewsletterDetail();
  }, [id]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!newsletter) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-600">Newsletter not found.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg my-8">
      {newsletter.imageUrl && (
        <img
          src={newsletter.imageUrl}
          alt={newsletter.title}
          className="w-full h-64 object-cover object-center rounded-md mb-6"
        />
      )}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{newsletter.title}</h1>
      <p className="text-gray-600 text-md mb-6">{newsletter.date}</p>
      <div
        className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: newsletter.content }}
      />
      <button
        onClick={() => navigate('/')}
        className="mt-8 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
      >
        Back to Newsletters
      </button>
    </div>
  );
};

export default NewsletterDetailPage;