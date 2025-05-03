'use client';

import { useState } from 'react';
import { FeedbackMimic as FeedbackMimicType } from '@/types';

interface FeedbackMimicProps {
  feedbackMimic: FeedbackMimicType[];
}

export default function FeedbackMimic({ feedbackMimic }: FeedbackMimicProps) {
  const [activeFeedback, setActiveFeedback] = useState<string>('supportive');

  // Find the active feedback
  const feedback = feedbackMimic.find(f => f.type === activeFeedback) || feedbackMimic[0];

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Peer Feedback</h2>

      <div className="flex justify-center space-x-2 mb-6">
        {feedbackMimic.map(f => (
          <button
            key={f.type}
            onClick={() => setActiveFeedback(f.type)}
            className={`px-3 py-1 rounded-full text-sm ${
              activeFeedback === f.type
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}
          >
            {f.type === 'cringe' && 'Cringe Meter'}
            {f.type === 'sarcastic' && 'Sarcastic'}
            {f.type === 'humorous' && 'Humorous'}
            {f.type === 'supportive' && 'Supportive'}
          </button>
        ))}
      </div>

      <div className="p-5 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
        <div className="flex items-center mb-4">
          <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-lg font-bold">
            {feedback?.type === 'cringe' && '😬'}
            {feedback?.type === 'sarcastic' && '🙄'}
            {feedback?.type === 'humorous' && '😂'}
            {feedback?.type === 'supportive' && '👍'}
          </div>
          <div className="ml-3">
            <p className="font-medium">
              {feedback?.type === 'cringe' && 'Cringe Meter'}
              {feedback?.type === 'sarcastic' && 'Sarcastic Friend'}
              {feedback?.type === 'humorous' && 'Funny Buddy'}
              {feedback?.type === 'supportive' && 'Supportive Pal'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {feedback?.type === 'cringe' && 'Keeping it real'}
              {feedback?.type === 'sarcastic' && 'Eye roll included'}
              {feedback?.type === 'humorous' && 'Always laughing'}
              {feedback?.type === 'supportive' && 'Your biggest fan'}
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute top-0 left-0 w-4 h-4 bg-gray-50 dark:bg-gray-700 transform rotate-45 -translate-y-1/2 ml-4 border-l border-t border-gray-200 dark:border-gray-600"></div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
            <p className="text-gray-700 dark:text-gray-300">{feedback?.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}