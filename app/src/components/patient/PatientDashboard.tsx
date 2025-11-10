import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getPatientById } from '../../data/mockPatients';
import { getRecentGlucoseReadings } from '../../data/mockHealthData';
import { getUpcomingAppointments } from '../../data/mockAppointments';
import { Activity, Calendar, TrendingUp } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const patient = user ? getPatientById(user.id) : null;
  const recentGlucose = user ? getRecentGlucoseReadings(user.id, 7) : [];
  const upcomingAppointments = user ? getUpcomingAppointments(user.id) : [];

  if (!patient) {
    return (
      <div className="card">
        <p className="text-gray-500">Unable to load patient data.</p>
      </div>
    );
  }

  // Calculate average glucose from last 7 days
  const avgRecentGlucose =
    recentGlucose.length > 0
      ? Math.round(recentGlucose.reduce((sum, reading) => sum + reading.value, 0) / recentGlucose.length)
      : patient.averageGlucose;

  const nextAppointment = upcomingAppointments.length > 0 ? upcomingAppointments[0] : null;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="card bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <div className="flex items-center space-x-4">
          {patient.profileImage && (
            <img
              src={patient.profileImage}
              alt={patient.name}
              className="h-16 w-16 rounded-full object-cover border-4 border-white/30"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {patient.name.split(' ')[0]}!</h1>
            <p className="text-primary-100">Here's your health overview</p>
          </div>
        </div>
      </div>

      {/* Key Metrics - Simple 3 column layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-gray-600">A1C Level</p>
            <TrendingUp className="h-6 w-6 text-primary-600" />
          </div>
          <p className="text-4xl font-bold text-gray-900 mb-2">{patient.latestA1C}%</p>
          <span className={`badge-${patient.latestA1C < 7 ? 'success' : patient.latestA1C < 8 ? 'warning' : 'danger'}`}>
            {patient.latestA1C < 7 ? 'Excellent' : patient.latestA1C < 8 ? 'Good' : 'Needs Attention'}
          </span>
          <p className="text-xs text-gray-500 mt-2">Target: Below 7%</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-gray-600">Blood Glucose</p>
            <Activity className="h-6 w-6 text-primary-600" />
          </div>
          <p className="text-4xl font-bold text-gray-900 mb-2">{avgRecentGlucose}</p>
          <p className="text-sm text-gray-600">mg/dL</p>
          <p className="text-xs text-gray-500 mt-2">7-day average</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-gray-600">Next Appointment</p>
            <Calendar className="h-6 w-6 text-primary-600" />
          </div>
          {nextAppointment ? (
            <>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {format(parseISO(nextAppointment.date), 'MMM d')}
              </p>
              <p className="text-sm text-gray-600">{nextAppointment.time}</p>
              <p className="text-xs text-gray-500 mt-2">{format(parseISO(nextAppointment.date), 'yyyy')}</p>
            </>
          ) : (
            <p className="text-sm text-gray-500">No upcoming appointments</p>
          )}
        </div>
      </div>

      {/* Simple Status Message */}
      <div className="card bg-blue-50 border-2 border-blue-200">
        <p className="text-gray-900">
          {patient.latestA1C < 7
            ? 'Your diabetes is well controlled. Keep up the great work!'
            : patient.latestA1C < 8
            ? 'Your diabetes control is good. Continue with your current plan and check in with your doctor regularly.'
            : 'Your blood sugar needs attention. Please follow up with your doctor to adjust your treatment plan.'}
        </p>
      </div>
    </div>
  );
};

export default PatientDashboard;
