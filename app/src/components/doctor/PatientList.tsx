import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockPatients } from '../../data/mockPatients';
import { Search, Calendar, AlertCircle, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';

const PatientList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredPatients = mockPatients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getA1CStatus = (a1c: number) => {
    if (a1c < 7) return { color: 'success', label: 'Good' };
    if (a1c < 8) return { color: 'warning', label: 'Fair' };
    return { color: 'danger', label: 'High' };
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Patient Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage and monitor your patients</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search patients by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Patients</p>
              <p className="text-2xl font-bold text-gray-900">{mockPatients.length}</p>
            </div>
            <div className="p-3 bg-primary-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Well Controlled</p>
              <p className="text-2xl font-bold text-success-600">
                {mockPatients.filter(p => p.latestA1C < 7).length}
              </p>
            </div>
            <div className="p-3 bg-success-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-success-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Need Attention</p>
              <p className="text-2xl font-bold text-danger-600">
                {mockPatients.filter(p => (p.recentAlerts?.length ?? 0) > 0).length}
              </p>
            </div>
            <div className="p-3 bg-danger-100 rounded-lg">
              <AlertCircle className="h-6 w-6 text-danger-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Patient Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => {
          const a1cStatus = getA1CStatus(patient.latestA1C);

          return (
            <div
              key={patient.id}
              onClick={() => navigate(`/doctor/patient/${patient.id}`)}
              className="card hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {patient.profileImage ? (
                    <img
                      src={patient.profileImage}
                      alt={patient.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-600 font-semibold">
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
                    <p className="text-sm text-gray-600">{patient.age} years old</p>
                  </div>
                </div>
                <span className={`badge-${a1cStatus.color}`}>
                  {a1cStatus.label}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">A1C</span>
                  <span className="font-semibold text-gray-900">{patient.latestA1C}%</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Avg Glucose</span>
                  <span className="font-semibold text-gray-900">{patient.averageGlucose} mg/dL</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Compliance</span>
                  <span className="font-semibold text-gray-900">{patient.medicationCompliance}%</span>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>
                      Last visit: {format(new Date(patient.lastAppointment), 'MMM d, yyyy')}
                    </span>
                  </div>
                  {patient.nextAppointment && (
                    <div className="flex items-center text-sm text-primary-600 mt-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>
                        Next: {format(new Date(patient.nextAppointment), 'MMM d, yyyy')}
                      </span>
                    </div>
                  )}
                </div>

                {patient.recentAlerts && patient.recentAlerts.length > 0 && (
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex items-start">
                      <AlertCircle className="h-4 w-4 text-danger-600 mr-2 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-danger-600">{patient.recentAlerts[0]}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredPatients.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No patients found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default PatientList;
