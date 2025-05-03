'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import UploadForm from '@/components/UploadForm';
import ScoreCard from '@/components/ScoreCard';
import Suggestions from '@/components/Suggestions';
import FeedbackMimic from '@/components/FeedbackMimic';
import CallToAction from '@/components/CallToAction';
import Subscription from '@/components/Subscription';
import SubscriptionStatus from '@/components/SubscriptionStatus';
import { AnalysisResponse } from '@/types';

export default function DashboardContent() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isSubscribed, setIsSubscribed] = useState(false);
  // We're using isCheckingSubscription in conditionals but not updating it after initialization
  const [isCheckingSubscription] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleAnalysisStart = () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
  };

  const handleAnalysisComplete = (result: AnalysisResponse) => {
    setIsAnalyzing(false);
    setAnalysisResult(result);
  };

  const handleSubscriptionComplete = () => {
    setIsSubscribed(true);
  };

  const handleReset = () => {
    setAnalysisResult(null);
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    );
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
          VibeCheck Dashboard
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          The Ultimate Social Media Post Validator
        </p>

        <div className="mt-4 flex justify-center space-x-4">
          <a
            href="/dashboard"
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            Dashboard
          </a>
          <a
            href="/settings"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
          >
            Account Settings
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto space-y-8">
        {isCheckingSubscription && (
          <div className="flex flex-col items-center justify-center p-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300">Loading...</p>
          </div>
        )}

        {!isCheckingSubscription && !isSubscribed && (
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
