'use client';

interface CallToActionProps {
  overallScore: number;
  onReset: () => void;
}

export default function CallToAction({ overallScore, onReset }: CallToActionProps) {
  // Determine the appropriate action based on the score
  const getAction = () => {
    if (overallScore >= 7) {
      return {
        title: 'Post It!',
        description: 'Your content is ready to shine. Go ahead and share it with the world!',
        buttonText: 'Post Now',
        buttonClass: 'bg-green-600 hover:bg-green-700',
        icon: '🚀',
      };
    } else if (overallScore >= 4) {
      return {
        title: 'Refine It',
        description: 'Your content has potential but could use some improvements. Check out our suggestions!',
        buttonText: 'Refine Content',
        buttonClass: 'bg-yellow-600 hover:bg-yellow-700',
        icon: '✏️',
      };
    } else {
      return {
        title: 'Burn It',
        description: 'This content might not get the response you want. Consider starting fresh.',
        buttonText: 'Start Over',
        buttonClass: 'bg-red-600 hover:bg-red-700',
        icon: '🔥',
      };
    }
  };

  const action = getAction();

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6">
      <h2 className="text-2xl font-bold mb-2 text-center">What Next?</h2>
      
      <div className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="text-4xl mb-4">{action.icon}</div>
        <h3 className="text-xl font-bold mb-2">{action.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-6">{action.description}</p>
        
        <div className="flex space-x-4">
          <button
            onClick={() => window.alert('This would post your content to social media!')}
            className={`px-6 py-2 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              overallScore >= 7 ? action.buttonClass : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={overallScore < 7}
          >
            Post It
          </button>
          
          <button
            onClick={onReset}
            className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
