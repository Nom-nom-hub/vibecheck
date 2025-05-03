'use client';

import { useState, useEffect } from 'react';
import UploadForm from '@/components/UploadForm';
import ScoreCard from '@/components/ScoreCard';
import Suggestions from '@/components/Suggestions';
import FeedbackMimic from '@/components/FeedbackMimic';
import CallToAction from '@/components/CallToAction';
import Subscription from '@/components/Subscription';
import SubscriptionStatus from '@/components/SubscriptionStatus';
import LandingPage from '@/components/LandingPage';
import { useAuth } from '@/contexts/AuthContext';
import { AnalysisResponse } from '@/types';

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isCheckingSubscription, setIsCheckingSubscription] = useState(true);

  // Check subscription status
  useEffect(() => {
    const checkSubscription = async () => {
      try {
        // Import the checkSubscriptionStatus function
        const { checkSubscriptionStatus } = await import('@/lib/revenuecat');

        // Check if the user has an active subscription
        const { hasActiveSubscription, activeSubscription } = await checkSubscriptionStatus();

        console.log('Subscription check result:', { hasActiveSubscription, activeSubscription });

        // Update state based on subscription status
        setIsSubscribed(hasActiveSubscription);
        setIsCheckingSubscription(false);
      } catch (error) {
        console.error('Error checking subscription status:', error);
        // If there's an error, assume no subscription and show the subscription screen
        setIsSubscribed(false);
        setIsCheckingSubscription(false);
      }
    };

    // Start the subscription check
    checkSubscription();
  }, []);

  const handleAnalysisStart = () => {
    setIsAnalyzing(true);
  };

  const handleAnalysisComplete = (data: AnalysisResponse) => {
    setAnalysisResult(data);
    setIsAnalyzing(false);
  };

  const handleReset = () => {
    setAnalysisResult(null);
  };

  const handleSubscriptionComplete = () => {
    setIsSubscribed(true);
  };

  // State to track if we're on the homepage
  const [isHomepage, setIsHomepage] = useState(false);

  // Import auth context
  // We're not using these variables yet, but we'll need them later
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { /* user, loading */ } = useAuth();

  // Check if we're on the homepage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsHomepage(window.location.pathname === '/' || window.location.pathname === '');
    }
  }, []);

  // Show landing page for non-subscribed users who aren't in the subscription flow
  if (!isCheckingSubscription && !isSubscribed && isHomepage) {
    return <LandingPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <header className="max-w-4xl mx-auto text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-600 text-white text-3xl font-bold py-2 px-4 rounded-lg">
            VC
          </div>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
          VibeCheck
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          The Ultimate Social Media Post Validator
        </p>
      </header>

      <main className="max-w-4xl mx-auto space-y-8">
        {isCheckingSubscription && (
          <div className="flex flex-col items-center justify-center p-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300">Loading...</p>
          </div>
        )}

        {!isCheckingSubscription && !isSubscribed && !isHomepage && (
          <Subscription onSubscriptionComplete={handleSubscriptionComplete} />
        )}

        {!isCheckingSubscription && isSubscribed && !analysisResult && !isAnalyzing && (
          <>
            <div className="mb-4">
              <SubscriptionStatus />
            </div>
            <UploadForm
              onAnalysisStart={handleAnalysisStart}
              onAnalysisComplete={handleAnalysisComplete}
            />
          </>
        )}

        {!isCheckingSubscription && isSubscribed && isAnalyzing && (
          <div className="flex flex-col items-center justify-center p-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300">Analyzing your content...</p>
          </div>
        )}

        {!isCheckingSubscription && isSubscribed && analysisResult && (
          <div className="space-y-8">
            <div className="mb-4">
              <SubscriptionStatus />
            </div>
            <ScoreCard scoreCard={analysisResult.scoreCard} />
            <Suggestions suggestions={analysisResult.suggestions} />
            <FeedbackMimic feedbackMimic={analysisResult.feedbackMimic} />
            <CallToAction
              overallScore={analysisResult.scoreCard.overallScore}
              onReset={handleReset}
            />
          </div>
        )}
      </main>

      <footer className="max-w-4xl mx-auto mt-16 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>
          Powered by Gemini API • © {new Date().getFullYear()} VibeCheck
        </p>
      </footer>
    </div>
  );
}
