import React from 'react';
import { useNavigate } from 'react-router-dom';
import SubscriptionForm from '../components/SubscriptionForm';
import { subscribe } from '../services/api';
import { SubscriptionFormData } from '../types';

const SubscribePage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubscriptionSubmit = async (formData: SubscriptionFormData) => {
    try {
      const response = await subscribe(formData);
      if (response.success) {
        navigate('/success', { state: { message: response.message, email: formData.email } });
      } else {
        // If the simulated API returns a failure, throw an error to be caught by the form
        throw new Error(response.message || 'Subscription failed due to an unknown error.');
      }
    } catch (error) {
      console.error('Subscription submission failed:', error);
      // Re-throw the error so SubscriptionForm can display it
      throw error;
    }
  };

  return (
    <div className="py-8">
      <SubscriptionForm onSubmit={handleSubscriptionSubmit} />
    </div>
  );
};

export default SubscribePage;