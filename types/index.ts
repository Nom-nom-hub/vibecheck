// Score criteria types
export type ScoreCriteria = 
  | 'cringeFactor'
  | 'originality'
  | 'clarity'
  | 'trendiness'
  | 'relatability'
  | 'engagementPotential';

// Score type
export interface Score {
  value: number; // 0-10
  feedback: string;
}

// Complete score card
export interface ScoreCard {
  cringeFactor: Score;
  originality: Score;
  clarity: Score;
  trendiness: Score;
  relatability: Score;
  engagementPotential: Score;
  overallScore: number; // Average of all scores
}

// Suggestion type
export interface Suggestion {
  type: 'tone' | 'trendiness' | 'clarity' | 'engagement' | 'emoji' | 'altText';
  content: string;
}

// Feedback mimic type
export interface FeedbackMimic {
  type: 'cringe' | 'sarcastic' | 'humorous' | 'supportive';
  content: string;
}

// Content type
export type ContentType = 'caption' | 'image' | 'video';

// Analysis request
export interface AnalysisRequest {
  contentType: ContentType;
  content: string; // Text content or base64 encoded image/video
  fileName?: string; // For image/video
  mimeType?: string; // For image/video
}

// Analysis response
export interface AnalysisResponse {
  scoreCard: ScoreCard;
  suggestions: Suggestion[];
  feedbackMimic: FeedbackMimic[];
}
