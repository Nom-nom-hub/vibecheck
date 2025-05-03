// Content types
export type ContentType = 'caption' | 'image' | 'video';

// Analysis result types
export interface ScoreCard {
  engagement: number;
  relatability: number;
  cringe: number;
  originality: number;
  clarity: number;
  trendiness: number;
  overallScore: number;
}

export interface Suggestion {
  type: string;
  content: string;
}

export interface FeedbackMimic {
  content: string;
}

export interface AnalysisResponse {
  scoreCard: ScoreCard;
  suggestions: Suggestion[];
  feedbackMimic: FeedbackMimic;
}

// Define the AnalysisResult type to match what's used in UploadForm
export interface AnalysisResult {
  scores: {
    engagement: number;
    relatability: number;
    cringe: number;
    originality: number;
    clarity: number;
    trendiness: number;
  };
  suggestions: Array<{
    type: string;
    content: string;
  }>;
  overallScore: number;
  summary: string;
}
