import React from 'react';
import Sidebar from '../components/Sidebar';
import { FileText } from 'lucide-react';
import { PdfButton } from '../components/PdfButton';
import { ExcelButton } from '../components/ExcelButton';

const Reports: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-[#F9FAFB]">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10">
        {/* Title & Description */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-600" />
              Savings Reports
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              View the full summary of your goals, categories, and contributions to evaluate your financial progress.
            </p>
          </div>
          <img
            src="/images/banner.png"
            alt="Report illustration"
            className="w-24 h-auto hidden md:block"
          />
        </div>

        {/* Report Container */}
        <div className="bg-white shadow rounded-lg p-6 border space-y-8">
          {/* Available Reports */}
          <div>
            <h3 className="text-blue-800 font-semibold text-lg mb-2 flex items-center gap-2">
              📌 Available Reports
            </h3>
            <ul className="list-disc list-inside text-sm text-gray-800 space-y-2">
              <li>📊 Goal status: completed, overdue, and in progress with percentage.</li>
              <li>📁 Category breakdown: home, health, leisure, education, and more.</li>
              <li>📅 Full contribution log: by goal, date, and amount.</li>
              <li>📈 Comparison between planned savings vs actual contributions.</li>
            </ul>
          </div>

          {/* Export Options */}
          <div>
            <h3 className="text-blue-800 font-semibold text-lg mb-2 flex items-center gap-2">
              🧾 Export Reports
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              Select a format to generate and download your personalized reports.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-[#2563EB] hover:bg-[#1E40AF] text-white font-semibold px-5 py-2 rounded shadow transition duration-200">
                <PdfButton />
              </button>
              <button className="bg-[#10B981] hover:bg-[#059669] text-white font-semibold px-5 py-2 rounded shadow transition duration-200">
                <ExcelButton />
              </button>
            </div>
          </div>

          <p className="text-sm text-gray-500 italic text-center mt-6">
            📌 Export features are available. Coming soon: filters by date, goal, and custom range.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Reports;
