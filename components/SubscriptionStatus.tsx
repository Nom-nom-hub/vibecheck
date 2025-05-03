'use client';

import { useState, useEffect } from 'react';
import { checkSubscriptionStatus } from '@/lib/revenuecat';

interface SubscriptionStatusProps {
  onManageSubscription?: () => void;
}

export default function SubscriptionStatus({ onManageSubscription }: SubscriptionStatusProps) {
  const [subscriptionType, setSubscriptionType] = useState<string | null>(null);
  const [managementURL, setManagementURL] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getSubscriptionStatus = async () => {
      try {
        const { activeSubscription, customerInfo } = await checkSubscriptionStatus();
        
        setSubscriptionType(activeSubscription);
        
        if (customerInfo && customerInfo.managementURL) {
          setManagementURL(customerInfo.managementURL);
        }
      } catch (err) {
        console.error('Error fetching subscription status:', err);
        setError('Failed to load subscription information');
      } finally {
        setIsLoading(false);
      }
    };
    
    getSubscriptionStatus();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-600 mr-2"></div>
        <span className="text-sm text-gray-600 dark:text-gray-400">Loading subscription info...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-sm text-red-500 p-4">
        {error}
      </div>
    );
  }

  if (!subscriptionType) {
    return (
      <div className="text-sm text-gray-600 dark:text-gray-400 p-4">
        No active subscription
      </div>
    );
  }

  return (
    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
            Active Subscription: {subscriptionType === 'pro' ? 'Pro Plan' : 'Basic Plan'}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {subscriptionType === 'pro' 
              ? 'Unlimited posts and premium features' 
              : 'Up to 10 posts per month'}
          </p>
        </div>
        
        {managementURL && (
          <a
            href={managementURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            Manage Subscription
          </a>
        )}
        
        {!managementURL && onManageSubscription && (
          <button
            onClick={onManageSubscription}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            Manage Subscription
          </button>
        )}
      </div>
    </div>
  );
}
