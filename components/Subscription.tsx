'use client';

import { useState, useEffect } from 'react';
import {
  initializeRevenueCat,
  getOfferings,
  purchasePackage,
  checkSubscriptionStatus,
  PRODUCT_IDS
} from '@/lib/revenuecat';

interface SubscriptionProps {
  onSubscriptionComplete: () => void;
}

export default function Subscription({ onSubscriptionComplete }: SubscriptionProps) {
  const [offerings, setOfferings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);

  useEffect(() => {
    // Check if user already has a subscription
    const checkSubscription = async () => {
      try {
        console.log('Initializing subscription flow...');

        // Initialize RevenueCat
        const initialized = initializeRevenueCat();
        if (!initialized) {
          throw new Error('Failed to initialize RevenueCat');
        }

        // First check if the user already has an active subscription
        try {
          console.log('Checking existing subscription status...');
          const { hasActiveSubscription } = await checkSubscriptionStatus();

          if (hasActiveSubscription) {
            console.log('User has active subscription, skipping subscription screen');
            // User already has a subscription, skip the subscription screen
            onSubscriptionComplete();
            return;
          }
          console.log('No active subscription found, continuing to show options');
        } catch (statusError) {
          console.error('Error checking subscription status:', statusError);
          // Continue to show subscription options
        }

        // Get offerings from RevenueCat
        console.log('Fetching subscription offerings...');
        const offeringsData = await getOfferings();

        if (!offeringsData) {
          console.error('No offerings data returned from RevenueCat');
          setError('Unable to load subscription options. Please try again later.');
          return;
        }

        // Check if we have any offerings at all
        const allOfferingIds = Object.keys(offeringsData.all || {});
        console.log('All available offering IDs:', allOfferingIds);

        if (!offeringsData.current) {
          console.error('No current offering available from RevenueCat');

          // If we have offerings but no current offering, try to use the first one
          if (allOfferingIds.length > 0) {
            const firstOffering = offeringsData.all[allOfferingIds[0]];
            if (firstOffering && firstOffering.availablePackages && firstOffering.availablePackages.length > 0) {
              console.log('Using first available offering as fallback:', allOfferingIds[0]);

              // Create a modified offerings object with the first offering as current
              const modifiedOfferings = {
                ...offeringsData,
                current: firstOffering
              };

              setOfferings(modifiedOfferings);
              return;
            }
          }

          setError('No subscription plans are currently available. Please try again later.');
        } else if (!offeringsData.current.availablePackages || offeringsData.current.availablePackages.length === 0) {
          console.error('No packages available in the current offering');

          // Try to find any offering with packages
          let foundOfferingWithPackages = false;

          for (const offeringId of allOfferingIds) {
            const offering = offeringsData.all[offeringId];
            if (offering && offering.availablePackages && offering.availablePackages.length > 0) {
              console.log(`Found packages in offering "${offeringId}", using as fallback`);

              // Create a modified offerings object with this offering as current
              const modifiedOfferings = {
                ...offeringsData,
                current: offering
              };

              setOfferings(modifiedOfferings);
              foundOfferingWithPackages = true;
              break;
            }
          }

          if (!foundOfferingWithPackages) {
            setError('No subscription plans are currently available. Please try again later.');
          }
        } else {
          console.log('Successfully loaded offerings with packages:', offeringsData.current.availablePackages.length);
          setOfferings(offeringsData);
        }
      } catch (err) {
        console.error('Error in subscription flow:', err);

        // Provide more specific error messages based on the error
        if (err instanceof Error) {
          if (err.message.includes('network') || err.message.includes('timeout')) {
            setError('Network error. Please check your internet connection and try again.');
          } else if (err.message.includes('initialize')) {
            setError('Could not initialize the subscription service. Please refresh the page and try again.');
          } else {
            setError('Failed to load subscription options. Please try again later.');
          }
        } else {
          setError('Failed to load subscription options. Please try again later.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkSubscription();
  }, [onSubscriptionComplete]);

  // Debug: Log the structure of the first package
  useEffect(() => {
    if (offerings && offerings.current && offerings.current.availablePackages && offerings.current.availablePackages.length > 0) {
      console.log('First package structure:', JSON.stringify(offerings.current.availablePackages[0], null, 2));
    }
  }, [offerings]);

  const handlePurchase = async (packageId: string) => {
    setIsPurchasing(true);
    setError(null);

    try {
      // Find the package to purchase
      if (!offerings || !offerings.current) {
        throw new Error('No offerings available');
      }

      const packageToPurchase = offerings.current.availablePackages.find(
        (pkg: any) => pkg.identifier === packageId
      );

      if (!packageToPurchase) {
        throw new Error('Selected package not found');
      }

      console.log('Attempting to purchase package:', packageId, packageToPurchase);

      // Debug: Log the package structure
      if (packageToPurchase) {
        console.log('Package structure:', JSON.stringify(packageToPurchase, null, 2));
      }

      // Purchase through RevenueCat
      const customerInfo = await purchasePackage(packageToPurchase);

      // Verify that the purchase was successful by checking entitlements
      if (!customerInfo) {
        console.error('Purchase completed but no customer info returned');
        throw new Error('Subscription purchase failed. Please try again or contact support.');
      }

      if (!customerInfo.entitlements) {
        console.error('Purchase completed but no entitlements found in customer info');
        throw new Error('Subscription purchase failed. Please try again or contact support.');
      }

      if (!customerInfo.entitlements.active) {
        console.error('Purchase completed but no active entitlements found');
        throw new Error('Subscription purchase failed. Please try again or contact support.');
      }

      if (!customerInfo.entitlements.active.basic && !customerInfo.entitlements.active.pro) {
        console.error('Purchase completed but neither basic nor pro entitlements are active:',
          Object.keys(customerInfo.entitlements.active));
        throw new Error('Subscription purchase failed. Please try again or contact support.');
      }

      console.log('Purchase successful through RevenueCat with active entitlements:',
        Object.keys(customerInfo.entitlements.active));

      // Only complete if we have verified the purchase was successful
      onSubscriptionComplete();
    } catch (err) {
      // Handle specific RevenueCat errors
      if (err instanceof Error) {
        console.error('Purchase error details:', err.message);

        if (err.message.includes('cancel') || err.message.includes('cancelled')) {
          setError('Purchase was cancelled. Please try again when you are ready.');
        } else if (err.message.includes('already owns') || err.message.includes('already has')) {
          // User already has a subscription, we can allow them to proceed
          console.log('User already has an active subscription');
          onSubscriptionComplete();
          return;
        } else if (err.message.includes('network') || err.message.includes('timeout')) {
          setError('Network error during purchase. Please check your internet connection and try again.');
        } else if (err.message.includes('payment') || err.message.includes('card')) {
          setError('Payment processing failed. Please check your payment details and try again.');
        } else {
          // Provide a more user-friendly error message
          setError('We could not complete your purchase. Please try again or contact support.');
          console.error('Original error:', err.message);
        }
      } else {
        setError('Failed to complete purchase. Please try again.');
      }

      console.error('Error in purchase flow:', err);
    } finally {
      setIsPurchasing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-300">Loading subscription options...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 text-center">
        <div className="text-red-500 mb-4">⚠️</div>
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!offerings || !offerings.current) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 text-center">
        <p className="text-gray-600 dark:text-gray-300">No subscription options available at this time.</p>
      </div>
    );
  }

  // This debug useEffect was moved to the top of the component to follow React's Rules of Hooks

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Choose Your Plan</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {offerings.current.availablePackages.map((pkg: any) => {
          // Debug: Log each package
          console.log('Package:', pkg.identifier, pkg);

          // Use webBillingProduct instead of product
          const product = pkg.webBillingProduct || {};

          return (
          <div
            key={pkg.identifier}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedPackage === pkg.identifier
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
            }`}
            onClick={() => setSelectedPackage(pkg.identifier)}
          >
            <h3 className="text-lg font-semibold mb-2">{product.title || 'Subscription'}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{product.description || 'Monthly subscription'}</p>
            <div className="flex justify-between items-end">
              <div>
                <span className="text-2xl font-bold">{product.priceString || product.price || '$9.99'}</span>
                <span className="text-gray-500 dark:text-gray-400 ml-1">
                  /{pkg.packageType === 'MONTHLY' ? 'month' : 'year'}
                </span>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  checked={selectedPackage === pkg.identifier}
                  onChange={() => setSelectedPackage(pkg.identifier)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
              </div>
            </div>
          </div>
        )})}
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="flex justify-center">
        <button
          onClick={() => selectedPackage && handlePurchase(selectedPackage)}
          disabled={!selectedPackage || isPurchasing}
          className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPurchasing ? 'Processing...' : 'Subscribe Now'}
        </button>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-6">
        By subscribing, you agree to our Terms of Service and Privacy Policy.
        You can cancel your subscription at any time.
      </p>
    </div>
  );
}
