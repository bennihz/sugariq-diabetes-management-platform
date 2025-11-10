import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, Home, User, Calendar, Activity } from 'lucide-react';

const Navigation: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to={user?.role === 'doctor' ? '/doctor' : '/patient'}>
              <img src="/logo_sugarIQ.svg" alt="SugarIQ" className="h-12 md:h-14 w-auto" />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6">
            {user?.role === 'doctor' ? (
              <Link
                to="/doctor"
                className="flex items-center space-x-1 sm:space-x-2 text-gray-700 hover:text-primary-600 transition-colors p-2"
                title="Patients"
              >
                <Home className="h-5 w-5" />
                <span className="hidden sm:inline font-medium">Patients</span>
              </Link>
            ) : (
              <>
                <Link
                  to="/patient"
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors p-2"
                  title="Dashboard"
                >
                  <Home className="h-5 w-5" />
                  <span className="hidden md:inline font-medium">Dashboard</span>
                </Link>
                <Link
                  to="/patient/health"
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors p-2"
                  title="My Health"
                >
                  <Activity className="h-5 w-5" />
                  <span className="hidden md:inline font-medium">Health</span>
                </Link>
                <Link
                  to="/patient/appointments"
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors p-2"
                  title="Appointments"
                >
                  <Calendar className="h-5 w-5" />
                  <span className="hidden md:inline font-medium">Appointments</span>
                </Link>
              </>
            )}

            {/* User & Logout Section */}
            <div className="flex items-center space-x-2 sm:space-x-3 border-l border-gray-200 pl-2 sm:pl-4 ml-2 sm:ml-4">
              {/* User info - hidden on mobile, shown on tablet+ */}
              <div className="hidden lg:flex items-center space-x-2">
                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-5 w-5 text-gray-500" />
                )}
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{user?.name}</p>
                  <p className="text-gray-500 capitalize">{user?.role}</p>
                </div>
              </div>

              {/* Logout button */}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors p-2"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
                <span className="hidden sm:inline font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
