import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPatientById } from '../../data/mockPatients';
import { getHealthDataByPatientId } from '../../data/mockHealthData';
import { getTranscriptsByPatientId } from '../../data/mockTranscripts';
import { ArrowLeft } from 'lucide-react';
import OverviewTab from './OverviewTab';
import HealthDataTab from './HealthDataTab';
import MedicationsTab from './MedicationsTab';
import AppointmentsTab from './AppointmentsTab';
import AIChatTab from './AIChatTab';
import LiveSessionTab from './LiveSessionTab';
import ExportTab from './ExportTab';

type TabType = 'overview' | 'health' | 'medications' | 'appointments' | 'chat' | 'live' | 'export';

const PatientDetail: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const patient = patientId ? getPatientById(patientId) : undefined;
  const healthData = patientId ? getHealthDataByPatientId(patientId) : undefined;
  const transcripts = patientId ? getTranscriptsByPatientId(patientId) : [];

  if (!patient) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Patient not found</p>
        <button onClick={() => navigate('/doctor')} className="btn-primary mt-4">
          Back to Patients
        </button>
      </div>
    );
  }

  const tabs: { id: TabType; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'health', label: 'Health Data' },
    { id: 'medications', label: 'Medications' },
    { id: 'appointments', label: 'Appointments' },
    { id: 'chat', label: 'AI Chat' },
    { id: 'live', label: 'Live Session' },
    { id: 'export', label: 'Export' },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/doctor')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Patients
        </button>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {patient.profileImage ? (
              <img
                src={patient.profileImage}
                alt={patient.name}
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : (
              <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-600 font-semibold text-xl">
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{patient.name}</h1>
              <p className="text-gray-600 mt-1">
                {patient.age} years old • Patient ID: {patient.id}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Latest A1C</p>
            <p className="text-2xl font-bold text-gray-900">{patient.latestA1C}%</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && <OverviewTab patient={patient} healthData={healthData} />}
        {activeTab === 'health' && <HealthDataTab patient={patient} healthData={healthData} />}
        {activeTab === 'medications' && <MedicationsTab patient={patient} />}
        {activeTab === 'appointments' && <AppointmentsTab patient={patient} transcripts={transcripts} />}
        {activeTab === 'chat' && <AIChatTab patient={patient} healthData={healthData} />}
        {activeTab === 'live' && <LiveSessionTab patient={patient} />}
        {activeTab === 'export' && <ExportTab patient={patient} healthData={healthData} transcripts={transcripts} />}
      </div>
    </div>
  );
};

export default PatientDetail;
