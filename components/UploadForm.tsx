'use client';

import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { fileToBase64, validateFile } from '@/lib/fileUtils';
import { ContentType } from '@/types';

interface UploadFormProps {
  onAnalysisComplete: (data: any) => void;
  onAnalysisStart: () => void;
}

export default function UploadForm({ onAnalysisComplete, onAnalysisStart }: UploadFormProps) {
  const [contentType, setContentType] = useState<ContentType>('caption');
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleContentTypeChange = (type: ContentType) => {
    setContentType(type);
    setError('');

    // Reset file or caption based on the selected type
    if (type === 'caption') {
      setFile(null);
      setFileName('');
    } else {
      setCaption('');
    }
  };

  const handleCaptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(e.target.value);
    setError('');
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    // Validate file
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const allowedVideoTypes = ['video/mp4', 'video/quicktime', 'video/webm'];
    const allowedTypes = contentType === 'image' ? allowedImageTypes : allowedVideoTypes;

    const validationError = validateFile(selectedFile, allowedTypes, 10); // 10MB max

    if (validationError) {
      setError(validationError);
      setFile(null);
      setFileName('');

      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      return;
    }

    setFile(selectedFile);
    setFileName(selectedFile.name);
    setError('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate form
    if (contentType === 'caption' && !caption.trim()) {
      setError('Please enter a caption');
      return;
    }

    if ((contentType === 'image' || contentType === 'video') && !file) {
      setError(`Please select a ${contentType} file`);
      return;
    }

    try {
      setIsLoading(true);
      onAnalysisStart();

      let content = '';
      let mimeType = '';

      if (contentType === 'caption') {
        content = caption;
      } else if (file) {
        content = await fileToBase64(file);
        mimeType = file.type;
      }

      // Call the API
      const response = await fetch('/api/gemini/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contentType,
          content,
          fileName: fileName || undefined,
          mimeType: mimeType || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze content');
      }

      const data = await response.json();
      onAnalysisComplete(data);
    } catch (error) {
      console.error('Error analyzing content:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Check Your Vibe</h2>

      <div className="flex justify-center space-x-4 mb-6">
        <button
          type="button"
          onClick={() => handleContentTypeChange('caption')}
          className={`px-4 py-2 rounded-full ${
            contentType === 'caption'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
          }`}
        >
          Caption
        </button>
        <button
          type="button"
          onClick={() => handleContentTypeChange('image')}
          className={`px-4 py-2 rounded-full ${
            contentType === 'image'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
          }`}
        >
          Image
        </button>
        <button
          type="button"
          onClick={() => handleContentTypeChange('video')}
          className={`px-4 py-2 rounded-full ${
            contentType === 'video'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
          }`}
        >
          Video
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {contentType === 'caption' ? (
          <div>
            <label htmlFor="caption" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Enter your caption
            </label>
            <textarea
              id="caption"
              value={caption}
              onChange={handleCaptionChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Type your social media caption here..."
            />
          </div>
        ) : (
          <div>
            <label htmlFor="file" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Upload your {contentType}
            </label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="file"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {contentType === 'image' ? 'PNG, JPG, GIF or WEBP' : 'MP4, MOV or WEBM'}
                  </p>
                </div>
                <input
                  id="file"
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept={contentType === 'image' ? 'image/*' : 'video/*'}
                  className="hidden"
                />
              </label>
            </div>
            {fileName && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Selected file: {fileName}
              </p>
            )}
          </div>
        )}

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Analyzing...' : 'Check My Vibe'}
          </button>
        </div>
      </form>
    </div>
  );
}