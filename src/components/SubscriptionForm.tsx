import React, { useState } from 'react';
import { SubscriptionFormData } from '../types';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

interface SubscriptionFormProps {
  onSubmit: (data: SubscriptionFormData) => Promise<void>;
  initialEmail?: string;
}

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({ onSubmit, initialEmail = '' }) => {
  const [email, setEmail] = useState(initialEmail);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await onSubmit({ email, name: name || undefined });
      // Clear form only on success if needed, or let parent handle navigation
      setEmail('');
      setName('');
    } catch (err) {
      console.error('Subscription form submission error:', err);
      setError((err as Error).message || 'Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Subscribe to Our Newsletter</h2>
      {error && <ErrorMessage message={error} className="mb-4" />}
      <div className="mb-5">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
          Name (Optional)
        </label>
        <input
          type="text"
          id="name"
          className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div className="mb-6">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="your@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full transition-colors duration-300 flex items-center justify-center"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <LoadingSpinner />
            <span className="ml-2">Subscribing...</span>
          </>
        ) : (
          'Subscribe'
        )}
      </button>
      <p className="text-center text-gray-500 text-xs mt-4">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </form>
  );
};

export default SubscriptionForm;