import { NextRequest, NextResponse } from 'next/server';
import { analyzeContent } from '@/lib/gemini';
import { AnalysisRequest } from '@/types';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Validate the request
    if (!body.contentType || !body.content) {
      return NextResponse.json(
        { error: 'Missing required fields: contentType and content' },
        { status: 400 }
      );
    }
    
    // Create the analysis request
    const analysisRequest: AnalysisRequest = {
      contentType: body.contentType,
      content: body.content,
      fileName: body.fileName,
      mimeType: body.mimeType,
    };
    
    // Analyze the content
    const result = await analyzeContent(analysisRequest);
    
    // Return the result
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in analyze API route:', error);
    
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 500 }
    );
  }
}
