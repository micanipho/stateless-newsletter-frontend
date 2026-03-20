import React from 'react';
import { Link } from 'react-router-dom';
import { Newsletter } from '../types';

interface NewsletterCardProps {
  newsletter: Newsletter;
}

const NewsletterCard: React.FC<NewsletterCardProps> = ({ newsletter }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col">
      {newsletter.imageUrl && (
        <img
          src={newsletter.imageUrl}
          alt={newsletter.title}
          className="w-full h-48 object-cover object-center"
        />
      )}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{newsletter.title}</h3>
        <p className="text-gray-600 text-sm mb-3">{newsletter.date}</p>
        <p className="text-gray-700 mb-4 flex-grow">{newsletter.excerpt}</p>
        <Link
          to={`/newsletter/${newsletter.id}`}
          className="inline-block bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors self-start"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default NewsletterCard;