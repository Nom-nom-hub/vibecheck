import { AnalysisRequest, AnalysisResponse } from '@/types';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

/**
 * Analyzes content using the Gemini API
 */
export async function analyzeContent(request: AnalysisRequest): Promise<AnalysisResponse> {
  // Default API key for development/preview environments
  const defaultApiKey = 'AIzaSyApURAEHhA40ZKqEBlbtdTnHurzb8FV5uY';

  // Use environment variable if available, otherwise use default
  const apiKey = process.env.GEMINI_API_KEY || defaultApiKey;

  // Log a warning if using default value
  if (!process.env.GEMINI_API_KEY) {
    console.warn('Warning: Using default Gemini API key. Set GEMINI_API_KEY environment variable for production.');
  }

  // Prepare the prompt based on content type
  let prompt = '';

  if (request.contentType === 'caption') {
    prompt = `Analyze this social media caption: "${request.content}"`;
  } else if (request.contentType === 'image') {
    // For images, we'll need to include the base64 data in the request
    prompt = `Analyze this social media image. Describe what you see and analyze its potential impact.`;
  } else if (request.contentType === 'video') {
    // For videos, similar to images but might need different handling
    prompt = `Analyze this social media video content. Describe what you see and analyze its potential impact.`;
  }

  // Add specific instructions for the analysis
  prompt += `\n\nProvide a detailed analysis with scores from 0-10 for the following criteria:
  1. Cringe Factor (lower is better)
  2. Originality
  3. Clarity
  4. Trendiness
  5. Relatability
  6. Engagement Potential

  For each criterion, provide a brief explanation for the score.

  Also provide:
  1. Suggestions for improving the content (tone, clarity, engagement hooks, emojis, etc.)
  2. Simulated peer feedback in different styles (cringe meter, sarcastic, humorous, supportive)

  Format your response as JSON with the following structure:
  {
    "scoreCard": {
      "cringeFactor": { "value": number, "feedback": "string" },
      "originality": { "value": number, "feedback": "string" },
      "clarity": { "value": number, "feedback": "string" },
      "trendiness": { "value": number, "feedback": "string" },
      "relatability": { "value": number, "feedback": "string" },
      "engagementPotential": { "value": number, "feedback": "string" },
      "overallScore": number
    },
    "suggestions": [
      { "type": "tone|trendiness|clarity|engagement|emoji|altText", "content": "string" }
    ],
    "feedbackMimic": [
      { "type": "cringe|sarcastic|humorous|supportive", "content": "string" }
    ]
  }`;

  // Prepare the request payload
  const payload = {
    contents: [
      {
        parts: [
          {
            text: prompt
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 2048,
    }
  };

  // If the content is an image, add it to the parts
  if (request.contentType === 'image') {
    payload.contents[0].parts.push({
      inlineData: {
        mimeType: request.mimeType || 'image/jpeg',
        data: request.content // Base64 encoded image data
      }
    });
  }

  try {
    // Make the API request
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();

    // Extract the text response from Gemini
    const textResponse = data.candidates[0]?.content?.parts[0]?.text;

    if (!textResponse) {
      throw new Error('No response text received from Gemini API');
    }

    // Parse the JSON response from the text
    // We need to extract the JSON part from the response as Gemini might include additional text
    const jsonMatch = textResponse.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error('Could not extract JSON from Gemini response');
    }

    const jsonResponse = JSON.parse(jsonMatch[0]);

    // Validate and return the response
    return jsonResponse as AnalysisResponse;
  } catch (error) {
    console.error('Error analyzing content with Gemini:', error);
    throw error;
  }
}