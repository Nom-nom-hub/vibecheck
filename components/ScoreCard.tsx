'use client';

import { ScoreCard as ScoreCardType } from '@/types';

interface ScoreCardProps {
  scoreCard: ScoreCardType;
}

export default function ScoreCard({ scoreCard }: ScoreCardProps) {
  // Helper function to get color based on score
  const getScoreColor = (score: number, isInverted: boolean = false) => {
    // For cringe factor, lower is better (inverted)
    if (isInverted) {
      if (score <= 3) return 'bg-green-500';
      if (score <= 6) return 'bg-yellow-500';
      return 'bg-red-500';
    }

    // For other criteria, higher is better
    if (score >= 7) return 'bg-green-500';
    if (score >= 4) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Vibe Score</h2>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Overall Score</h3>
          <div className="flex items-center">
            <span className="text-2xl font-bold mr-2">{scoreCard.overallScore.toFixed(1)}</span>
            <span className="text-sm text-gray-500">/10</span>
          </div>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
          <div
            className={`h-4 rounded-full ${
              scoreCard.overallScore >= 7
                ? 'bg-green-500'
                : scoreCard.overallScore >= 4
                ? 'bg-yellow-500'
                : 'bg-red-500'
            }`}
            style={{ width: `${scoreCard.overallScore * 10}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Cringe Factor */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <h4 className="font-medium">Cringe Factor</h4>
            <div className="flex items-center">
              <span className="font-bold mr-1">{scoreCard.cringeFactor.value}</span>
              <span className="text-xs text-gray-500">/10</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${getScoreColor(scoreCard.cringeFactor.value, true)}`}
              style={{ width: `${scoreCard.cringeFactor.value * 10}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{scoreCard.cringeFactor.feedback}</p>
        </div>

        {/* Originality */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <h4 className="font-medium">Originality</h4>
            <div className="flex items-center">
              <span className="font-bold mr-1">{scoreCard.originality.value}</span>
              <span className="text-xs text-gray-500">/10</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${getScoreColor(scoreCard.originality.value)}`}
              style={{ width: `${scoreCard.originality.value * 10}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{scoreCard.originality.feedback}</p>
        </div>

        {/* Clarity */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <h4 className="font-medium">Clarity</h4>
            <div className="flex items-center">
              <span className="font-bold mr-1">{scoreCard.clarity.value}</span>
              <span className="text-xs text-gray-500">/10</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${getScoreColor(scoreCard.clarity.value)}`}
              style={{ width: `${scoreCard.clarity.value * 10}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{scoreCard.clarity.feedback}</p>
        </div>

        {/* Trendiness */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <h4 className="font-medium">Trendiness</h4>
            <div className="flex items-center">
              <span className="font-bold mr-1">{scoreCard.trendiness.value}</span>
              <span className="text-xs text-gray-500">/10</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${getScoreColor(scoreCard.trendiness.value)}`}
              style={{ width: `${scoreCard.trendiness.value * 10}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{scoreCard.trendiness.feedback}</p>
        </div>

        {/* Relatability */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <h4 className="font-medium">Relatability</h4>
            <div className="flex items-center">
              <span className="font-bold mr-1">{scoreCard.relatability.value}</span>
              <span className="text-xs text-gray-500">/10</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${getScoreColor(scoreCard.relatability.value)}`}
              style={{ width: `${scoreCard.relatability.value * 10}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{scoreCard.relatability.feedback}</p>
        </div>

        {/* Engagement Potential */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <h4 className="font-medium">Engagement Potential</h4>
            <div className="flex items-center">
              <span className="font-bold mr-1">{scoreCard.engagementPotential.value}</span>
              <span className="text-xs text-gray-500">/10</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${getScoreColor(scoreCard.engagementPotential.value)}`}
              style={{ width: `${scoreCard.engagementPotential.value * 10}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{scoreCard.engagementPotential.feedback}</p>
        </div>
      </div>
    </div>
  );
}