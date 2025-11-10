import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Activity, UserCog, User } from 'lucide-react';
import { mockPatients } from '../../data/mockPatients';

const Login: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'doctor' | 'patient' | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<string>('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!selectedRole) return;

    if (selectedRole === 'doctor') {
      login('doctor');
      navigate('/doctor');
    } else {
      const patientId = selectedPatient || mockPatients[0].id;
      login('patient', patientId);
      navigate('/patient');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Activity className="h-16 w-16 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">SugarIQ</h1>
          <p className="text-gray-600 mt-2">Comprehensive Diabetes Management Platform</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Select User Type</h2>

          <div className="space-y-4 mb-6">
            <button
              onClick={() => {
                setSelectedRole('doctor');
                setSelectedPatient('');
              }}
              className={`w-full p-4 rounded-lg border-2 transition-all ${
                selectedRole === 'doctor'
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <UserCog className="h-6 w-6 text-primary-600" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Doctor</p>
                  <p className="text-sm text-gray-600">Access patient dashboard</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setSelectedRole('patient')}
              className={`w-full p-4 rounded-lg border-2 transition-all ${
                selectedRole === 'patient'
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <User className="h-6 w-6 text-primary-600" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Patient</p>
                  <p className="text-sm text-gray-600">View your health data</p>
                </div>
              </div>
            </button>
          </div>

          {selectedRole === 'patient' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Patient
              </label>
              <select
                value={selectedPatient}
                onChange={(e) => setSelectedPatient(e.target.value)}
                className="input-field"
              >
                {mockPatients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={!selectedRole}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              selectedRole
                ? 'bg-primary-600 hover:bg-primary-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continue
          </button>

          <p className="text-xs text-gray-500 text-center mt-6">
            Demo Mode: No real authentication required
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
