import React, { useState } from 'react';
import type { AppointmentTranscript } from '../../types';
import { Calendar, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface TranscriptionsTabProps {
  transcripts: AppointmentTranscript[];
}

const TranscriptionsTab: React.FC<TranscriptionsTabProps> = ({ transcripts }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (transcripts.length === 0) {
    return (
      <div className="card">
        <p className="text-gray-500">No appointment transcripts available for this patient.</p>
      </div>
    );
  }

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Appointment History</h2>
        <p className="text-sm text-gray-600">
          {transcripts.length} appointment{transcripts.length !== 1 ? 's' : ''} on record
        </p>
      </div>

      {transcripts
        .slice()
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((transcript) => {
          const isExpanded = expandedId === transcript.id;

          return (
            <div key={transcript.id} className="card">
              {/* Transcript Header */}
              <div
                onClick={() => toggleExpand(transcript.id)}
                className="cursor-pointer hover:bg-gray-50 -m-6 p-6 rounded-lg transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{format(parseISO(transcript.date), 'MMMM d, yyyy')}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{transcript.duration} minutes</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{transcript.summary}</p>
                  </div>
                  <button className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Full Transcript */}
              {isExpanded && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">Full Transcript</h3>
                  <div className="space-y-4">
                    {transcript.fullTranscript.map((message, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg ${
                          message.speaker === 'doctor'
                            ? 'bg-primary-50 border border-primary-100'
                            : 'bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-gray-900 capitalize">
                            {message.speaker === 'doctor' ? 'Dr. Afsoon' : 'Patient'}
                          </span>
                          <span className="text-xs text-gray-500">{message.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-700">{message.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default TranscriptionsTab;
