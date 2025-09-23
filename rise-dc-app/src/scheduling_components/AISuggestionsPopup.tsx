import { useState } from 'react';
import { getEventSuggestions } from '../shared/utils/aiSuggestions';

interface Event {
  name: string;
  startTime: any;
  endTime: any;
}

interface AISuggestionsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSuggestion: (suggestion: string) => void;
  events: Event[];
}

const AISuggestionsPopup: React.FC<AISuggestionsPopupProps> = ({ 
  isOpen, 
  onClose, 
  onSelectSuggestion, 
  events = [] 
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetSuggestions = async () => {
    setIsLoading(true);

    try {
      // Extract just the event names from the events array
      const eventNames = events.map((event: Event) => event.name);
      const aiSuggestions = await getEventSuggestions(eventNames);
      setSuggestions(aiSuggestions);
    } catch (error) {
      console.error('Failed to get suggestions:', error);
      setSuggestions(['Take a short break', 'Review your progress', 'Plan ahead', 'Reflect on goals']);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    onSelectSuggestion(suggestion);
    onClose();
    setSuggestions([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] px-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-black">AI Event Suggestions</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-black"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          {suggestions.length === 0 ? (
            <div>
              <p className="text-sm text-gray-600 mb-3">
                Get AI suggestions based on your current {events.length} scheduled events
              </p>
              <button
                onClick={handleGetSuggestions}
                disabled={isLoading || events.length === 0}
                className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Analyzing your schedule...' : 'Get Smart Suggestions'}
              </button>
              {events.length === 0 && (
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Add some events to your schedule first
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Based on your current schedule:</p>
              {suggestions.map((suggestion: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleSelectSuggestion(suggestion)}
                  className="w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-black"
                >
                  {suggestion.replace(/^\d+\.?\s*/, '')}
                </button>
              ))}
              <button
                onClick={handleGetSuggestions}
                disabled={isLoading}
                className="w-full px-3 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 text-sm disabled:opacity-50"
              >
                {isLoading ? 'Loading...' : 'Get Different Suggestions'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AISuggestionsPopup;