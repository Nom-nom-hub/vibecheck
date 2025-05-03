'use client';

import { useState } from 'react';
import { Suggestion } from '@/types';

interface SuggestionsProps {
  suggestions: Suggestion[];
}

export default function Suggestions({ suggestions }: SuggestionsProps) {
  const [activeTab, setActiveTab] = useState<string>('all');

  // Group suggestions by type
  const suggestionsByType: Record<string, Suggestion[]> = {
    all: suggestions,
    tone: suggestions.filter(s => s.type === 'tone'),
    trendiness: suggestions.filter(s => s.type === 'trendiness'),
    clarity: suggestions.filter(s => s.type === 'clarity'),
    engagement: suggestions.filter(s => s.type === 'engagement'),
    emoji: suggestions.filter(s => s.type === 'emoji'),
    altText: suggestions.filter(s => s.type === 'altText'),
  };

  // Filter out empty categories
  const availableTabs = Object.entries(suggestionsByType)
    .filter(([, items]) => items.length > 0)
    .map(([key]) => key);

  // Get the suggestions to display based on active tab
  const displayedSuggestions = suggestionsByType[activeTab] || [];

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Improvement Suggestions</h2>

      {/* Tab navigation */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {availableTabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1 rounded-full text-sm ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Suggestions list */}
      <div className="space-y-4">
        {displayedSuggestions.length > 0 ? (
          displayedSuggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
            >
              <div className="flex items-center mb-2">
                {suggestion.type === 'tone' && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 mr-2">
                    Tone
                  </span>
                )}
                {suggestion.type === 'trendiness' && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mr-2">
                    Trendiness
                  </span>
                )}
                {suggestion.type === 'clarity' && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 mr-2">
                    Clarity
                  </span>
                )}
                {suggestion.type === 'engagement' && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 mr-2">
                    Engagement
                  </span>
                )}
                {suggestion.type === 'emoji' && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200 mr-2">
                    Emoji
                  </span>
                )}
                {suggestion.type === 'altText' && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 mr-2">
                    Alt Text
                  </span>
                )}
              </div>
              <p className="text-gray-700 dark:text-gray-300">{suggestion.content}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No suggestions available for this category.
          </p>
        )}
      </div>
    </div>
  );
}