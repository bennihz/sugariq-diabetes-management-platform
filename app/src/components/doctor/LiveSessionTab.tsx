import React, { useState, useEffect, useRef } from 'react';
import type { Patient } from '../../types';
import { Video, Mic, PhoneOff, Play, Square, Upload, FileAudio, Brain, CheckCircle, ArrowRight, Monitor, Users } from 'lucide-react';

interface LiveSessionTabProps {
  patient: Patient;
}

type SessionType = 'online' | 'in-person' | null;
type SessionStage = 'selection' | 'active' | 'summary';

interface SessionSummary {
  duration: number;
  keyPoints: string[];
  healthMetrics: {
    metric: string;
    value: string;
    suggestion: string;
  }[];
  recommendations: string[];
}

const LiveSessionTab: React.FC<LiveSessionTabProps> = ({ patient }) => {
  const [sessionStage, setSessionStage] = useState<SessionStage>('selection');
  const [sessionType, setSessionType] = useState<SessionType>(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState<string[]>([]);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [sessionSummary, setSessionSummary] = useState<SessionSummary | null>(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isSessionActive) {
      intervalRef.current = setInterval(() => {
        setSessionDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isSessionActive]);

  const startSession = (type: SessionType) => {
    setSessionType(type);
    setSessionStage('active');
    setIsSessionActive(true);
    setSessionDuration(0);
    setTranscript([]);

    // Simulate live transcription appearing
    setTimeout(() => {
      addTranscriptLine('Doctor: Good morning! How have you been feeling since our last visit?');
    }, 2000);

    setTimeout(() => {
      addTranscriptLine(`Patient: Hi Doctor! I've been doing okay, trying to manage my blood sugar better.`);
    }, 5000);

    setTimeout(() => {
      addTranscriptLine('Doctor: That\'s great to hear. Let\'s review your recent glucose readings. I see here your average has been around 145 mg/dL.');
    }, 8000);

    setTimeout(() => {
      addTranscriptLine('Patient: Yes, I\'ve been checking three times a day like you recommended. My morning readings are usually between 120-140.');
    }, 11000);

    setTimeout(() => {
      addTranscriptLine('Doctor: Excellent consistency. Have you been experiencing any episodes of low blood sugar?');
    }, 14000);

    setTimeout(() => {
      addTranscriptLine('Patient: Just once last week. I think I miscalculated my carbs at lunch.');
    }, 17000);

    setTimeout(() => {
      addTranscriptLine('Doctor: Okay, that\'s good to know. Your A1C came back at 7.2%, which is improved from last quarter. Let\'s continue with your current medication and I\'d like to see you again in 3 months.');
    }, 20000);
  };

  const startInPersonRecording = () => {
    setIsRecording(true);
    startSession('in-person');
  };

  const endSession = async () => {
    setIsSessionActive(false);
    setIsRecording(false);
    setIsGeneratingSummary(true);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Simulate AI summary generation (AWS Bedrock/Comprehend Medical)
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Generate mock summary based on transcript
    const summary: SessionSummary = {
      duration: sessionDuration,
      keyPoints: [
        'Patient reports improved blood sugar management with consistent monitoring',
        'Average glucose levels: 145 mg/dL (morning readings 120-140 mg/dL)',
        'One hypoglycemic episode last week due to carbohydrate miscalculation',
        'A1C improved from previous quarter to 7.2%',
        'Patient maintaining medication compliance and checking 3x daily',
      ],
      healthMetrics: [
        {
          metric: 'Average Glucose',
          value: '145 mg/dL',
          suggestion: 'Update patient\'s 30-day average glucose reading',
        },
        {
          metric: 'A1C',
          value: '7.2%',
          suggestion: 'Record new A1C measurement for quarterly tracking',
        },
        {
          metric: 'Medication Compliance',
          value: 'High',
          suggestion: 'Maintain current compliance rate in records',
        },
      ],
      recommendations: [
        'Continue current medication regimen',
        'Schedule follow-up appointment in 3 months',
        'Review carbohydrate counting to prevent hypoglycemic episodes',
        'Encourage patient to maintain consistent monitoring schedule',
      ],
    };

    setSessionSummary(summary);
    setIsGeneratingSummary(false);
    setSessionStage('summary');
  };

  const addTranscriptLine = (line: string) => {
    setTranscript((prev) => [...prev, line]);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetSession = () => {
    setSessionStage('selection');
    setSessionType(null);
    setIsSessionActive(false);
    setIsRecording(false);
    setTranscript([]);
    setSessionDuration(0);
    setSessionSummary(null);
  };

  // Selection Screen
  if (sessionStage === 'selection') {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Appointment Type</h2>
          <p className="text-gray-600">
            Select how you'd like to conduct the appointment with {patient.name}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Online Video Appointment */}
          <div
            onClick={() => startSession('online')}
            className="card cursor-pointer hover:shadow-lg transition-all hover:border-primary-300 border-2 border-transparent"
          >
            <div className="flex flex-col items-center text-center py-8">
              <div className="p-6 bg-primary-100 rounded-full mb-4">
                <Monitor className="h-16 w-16 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Online Video Appointment</h3>
              <p className="text-gray-600 mb-6">
                Conduct a virtual appointment with real-time video and automatic transcription
              </p>
              <ul className="text-left space-y-2 text-sm text-gray-700 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-success-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Live video call with patient</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-success-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Real-time AWS Transcribe integration</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-success-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>AI-powered session summary</span>
                </li>
              </ul>
              <button className="btn-primary inline-flex items-center space-x-2">
                <Play className="h-5 w-5" />
                <span>Start Online Session</span>
              </button>
            </div>
          </div>

          {/* In-Person Recording */}
          <div
            onClick={startInPersonRecording}
            className="card cursor-pointer hover:shadow-lg transition-all hover:border-primary-300 border-2 border-transparent"
          >
            <div className="flex flex-col items-center text-center py-8">
              <div className="p-6 bg-success-100 rounded-full mb-4">
                <Users className="h-16 w-16 text-success-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">In-Person Recording</h3>
              <p className="text-gray-600 mb-6">
                Record an in-person appointment and transcribe using AWS Transcribe Medical
              </p>
              <ul className="text-left space-y-2 text-sm text-gray-700 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-success-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Audio recording of in-person visit</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-success-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>AWS Transcribe Medical transcription</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-success-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Automated health data extraction</span>
                </li>
              </ul>
              <button className="btn-primary bg-success-600 hover:bg-success-700 inline-flex items-center space-x-2">
                <FileAudio className="h-5 w-5" />
                <span>Start Recording</span>
              </button>
            </div>
          </div>
        </div>

        <div className="card bg-blue-50 border-2 border-blue-200">
          <h3 className="font-semibold text-gray-900 mb-2">HIPAA Compliant & Secure</h3>
          <p className="text-sm text-gray-700">
            All sessions are encrypted end-to-end and stored securely. Transcriptions are processed using
            AWS Transcribe Medical, which is HIPAA eligible and designed specifically for healthcare use cases.
          </p>
        </div>
      </div>
    );
  }

  // Active Session Screen
  if (sessionStage === 'active') {
    return (
      <div className="space-y-6">
        {/* Session Header */}
        <div className="card bg-primary-50 border-primary-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 bg-red-600 rounded-full animate-pulse"></div>
                <span className="font-semibold text-gray-900">
                  {sessionType === 'online' ? 'Live Video Session' : 'Recording In-Person Session'}
                </span>
              </div>
              <span className="text-gray-600">|</span>
              <span className="font-mono text-gray-900">{formatDuration(sessionDuration)}</span>
            </div>
            <button
              onClick={endSession}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors inline-flex items-center space-x-2"
            >
              <PhoneOff className="h-5 w-5" />
              <span>End {sessionType === 'online' ? 'Appointment' : 'Recording'}</span>
            </button>
          </div>
        </div>

        {/* Video/Recording Interface */}
        {sessionType === 'online' ? (
          <div className="grid grid-cols-2 gap-4">
            <div className="card bg-gray-900 text-white aspect-video flex items-center justify-center">
              <div className="text-center">
                <Video className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-400">Patient Video</p>
                <p className="text-xs text-gray-500 mt-1">{patient.name}</p>
              </div>
            </div>
            <div className="card bg-gray-800 text-white aspect-video flex items-center justify-center">
              <div className="text-center">
                <Video className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-400">Your Video</p>
                <p className="text-xs text-gray-500 mt-1">Dr. Smith</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="card bg-gray-900 text-white">
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="relative mb-6">
                  <FileAudio className="h-24 w-24 mx-auto text-success-400" />
                  {isRecording && (
                    <div className="absolute -top-2 -right-2 h-4 w-4 bg-red-600 rounded-full animate-pulse"></div>
                  )}
                </div>
                <p className="text-lg text-gray-300 mb-2">Recording In-Person Appointment</p>
                <p className="text-sm text-gray-500">
                  Audio is being captured and will be transcribed using AWS Transcribe Medical
                </p>
                <div className="mt-6 flex items-center justify-center space-x-2">
                  <div className="h-2 w-2 bg-success-500 rounded-full animate-pulse"></div>
                  <div className="h-2 w-2 bg-success-500 rounded-full animate-pulse delay-75"></div>
                  <div className="h-2 w-2 bg-success-500 rounded-full animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Controls (only for online) */}
        {sessionType === 'online' && (
          <div className="card">
            <div className="flex items-center justify-center space-x-4">
              <button className="p-4 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors">
                <Mic className="h-6 w-6 text-gray-700" />
              </button>
              <button className="p-4 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors">
                <Video className="h-6 w-6 text-gray-700" />
              </button>
              <button className="p-4 bg-primary-600 hover:bg-primary-700 rounded-full transition-colors">
                <Square className="h-6 w-6 text-white" />
              </button>
            </div>
          </div>
        )}

        {/* Live Transcription */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {sessionType === 'online' ? 'Live Transcription' : 'AWS Transcribe Medical'}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="h-2 w-2 bg-green-600 rounded-full animate-pulse"></div>
              <span>Transcribing...</span>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
            {transcript.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Transcription will appear here as the conversation progresses...
              </p>
            ) : (
              <div className="space-y-3">
                {transcript.map((line, index) => {
                  const isDoctor = line.startsWith('Doctor:');
                  return (
                    <div
                      key={index}
                      className={`p-3 rounded-lg ${
                        isDoctor ? 'bg-primary-50 border border-primary-100' : 'bg-white border border-gray-200'
                      }`}
                    >
                      <p className="text-sm text-gray-900">{line}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Summary Screen
  if (sessionStage === 'summary' && sessionSummary) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="card bg-success-50 border-success-200">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-8 w-8 text-success-600" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">Session Complete</h2>
              <p className="text-sm text-gray-600">
                {sessionType === 'online' ? 'Video appointment' : 'In-person recording'} with {patient.name} • Duration: {formatDuration(sessionSummary.duration)}
              </p>
            </div>
          </div>
        </div>

        {/* AI Summary */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <Brain className="h-6 w-6 text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900">AI-Generated Summary</h3>
            <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">AWS Bedrock</span>
          </div>
          <div className="space-y-3">
            {sessionSummary.keyPoints.map((point, index) => (
              <div key={index} className="flex items-start space-x-2">
                <ArrowRight className="h-4 w-4 text-primary-600 mt-1 flex-shrink-0" />
                <p className="text-sm text-gray-700">{point}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Health Metrics Extracted */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Metrics Extracted</h3>
          <p className="text-sm text-gray-600 mb-4">
            The following health data was identified in the conversation. Review and add to patient records:
          </p>
          <div className="space-y-3">
            {sessionSummary.healthMetrics.map((metric, index) => (
              <div key={index} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">{metric.metric}</p>
                    <p className="text-lg text-primary-600 font-bold">{metric.value}</p>
                  </div>
                  <button className="btn-primary text-sm py-1 px-3">
                    Add to Records
                  </button>
                </div>
                <p className="text-xs text-gray-600">{metric.suggestion}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations & Next Steps</h3>
          <div className="space-y-2">
            {sessionSummary.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-success-600 mt-1 flex-shrink-0" />
                <p className="text-sm text-gray-700">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button onClick={resetSession} className="btn-secondary">
            Start New Session
          </button>
          <div className="flex space-x-3">
            <button className="btn-secondary">Download Transcript</button>
            <button className="btn-primary">Save & Close</button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default LiveSessionTab;
