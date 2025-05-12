import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Top Navigation */}
      <div className="bg-white border-b px-6 py-3 flex flex-col md:flex-row justify-between items-center text-sm text-blue-900 shadow-sm gap-2 md:gap-0">
        <div className="flex items-center space-x-4">
          <button className="text-lg font-semibold hover:text-blue-600 transition-colors">
            ☰ Menu
          </button>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <span className="hidden sm:inline-block text-xl">🔍</span>
          <a
        onClick={() => navigate('/register')}
        className="hover:underline hover:text-blue-600 transition-colors cursor-pointer"
      >
        Open your account
      </a>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-1 rounded-full shadow-sm transition-all duration-200"
            onClick={() => navigate('/Login')}
          >
            Client Access
          </button>
        </div>
      </div>

      {/* Banner + Title Section */}
      <header className="bg-gradient-to-r from-green-200 via-green-100 to-green-200">
        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 mb-4">
            Home / People / Accounts / Services /{' '}
            <span className="font-semibold text-blue-900">Savings Simulator</span>
          </nav>

          {/* Content Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-blue-900 leading-snug">
                Savings and <br className="hidden sm:inline-block" /> Financial Goals
              </h1>
              <p className="text-gray-700 mt-2 text-base">
                Discover the growth of your account and build toward your dreams.
              </p>
            </div>
            <img
              src="/images/banner.png"
              alt="Woman holding piggy bank"
              className="w-48 h-auto drop-shadow-xl rounded-lg"
            />
          </div>
        </div>
      </header>

      {/* Sub Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col sm:flex-row gap-2 sm:gap-6 text-gray-700 text-sm">
          <a
            href="#"
            className="font-medium text-blue-900 border-b-2 border-blue-900 pb-1"
          >
            Savings Simulator
          </a>
          <a href="#" className="hover:text-blue-900 hover:underline transition-colors">
            Benefits
          </a>
        </div>
      </nav>
    </>
  );
};

export default Header;
