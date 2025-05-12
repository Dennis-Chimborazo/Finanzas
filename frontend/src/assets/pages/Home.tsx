import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const Home = () => {
  const navigate = useNavigate();
  const [goalType, setGoalType] = useState('');
  const [target, setTarget] = useState('');
  const [saved, setSaved] = useState('');
  const [deadline, setDeadline] = useState('');
  const [showResult, setShowResult] = useState(false);
  const interestRate = 0.05;

  const today = new Date();

  const {
    parsedTarget,
    parsedSaved,
    remaining,
    interest,
    totalWithInterest,
    weekly,
    monthly,
    weeksLeft,
    monthsLeft
  } = useMemo(() => {
    const pTarget = parseFloat(target) || 0;
    const pSaved = parseFloat(saved) || 0;
    const rem = pTarget - pSaved;
    const endDate = deadline ? new Date(deadline) : today;
    const msPerWeek = 1000 * 60 * 60 * 24 * 7;
    const msPerMonth = 1000 * 60 * 60 * 24 * 30;
    const weeks = Math.max(1, Math.ceil((endDate.getTime() - today.getTime()) / msPerWeek));
    const months = Math.max(1, Math.ceil((endDate.getTime() - today.getTime()) / msPerMonth));
    const weekly = rem > 0 ? rem / weeks : 0;
    const monthly = rem > 0 ? rem / months : 0;
    const interest = pTarget * interestRate;
    const total = pTarget + interest;

    return {
      parsedTarget: pTarget,
      parsedSaved: pSaved,
      remaining: rem,
      interest,
      totalWithInterest: total,
      weekly,
      monthly,
      weeksLeft: weeks,
      monthsLeft: months
    };
  }, [target, saved, deadline]);

  const handleCalculate = () => {
    setShowResult(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-2">
          Plan Your Savings
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Select your goal, and we will calculate how much you need to save weekly and monthly.
        </p>

        <div className="bg-white shadow rounded-lg grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Form */}
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What is your savings goal?
              </label>
              <select
                className="w-full border rounded px-3 py-2 text-sm"
                value={goalType}
                onChange={(e) => setGoalType(e.target.value)}
              >
                <option value="">-- Select a goal --</option>
                {["Save for saving", "Car", "House", "Education", "Emergency", "Children", "Retirement", "Marriage", "Business", "Health", "Vacation", "Other"].map((g, i) => (
                  <option key={i} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total amount to save ($)
              </label>
              <input
                type="number"
                placeholder="e.g. 12000"
                className="w-full border rounded px-3 py-2 text-sm"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount already saved ($)
              </label>
              <input
                type="number"
                placeholder="e.g. 1000"
                className="w-full border rounded px-3 py-2 text-sm"
                value={saved}
                onChange={(e) => setSaved(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deadline
              </label>
              <input
                type="date"
                className="w-full border rounded px-3 py-2 text-sm"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-green-500 hover:bg-green-700 text-white py-2 rounded font-semibold mt-4"
            >
              Calculate
            </button>
          </div>

          {/* Results */}
          <div className="text-center md:text-left">
            <h3 className="text-lg text-gray-600 mb-2">
              To reach your goal you need to save:
            </h3>
            <p className="text-4xl font-bold text-blue-800 mb-1">
              ${showResult ? monthly.toFixed(2) : '0.00'} / month
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Monthly for {showResult ? monthsLeft : 0} {monthsLeft === 1 ? "month" : "months"}
            </p>

            <p className="text-2xl text-gray-600 font-semibold mt-4 mb-2">
              Weekly saving recommendation
            </p>
            <p className="text-xl font-bold text-green-600">
              ${showResult ? weekly.toFixed(2) : '0.00'} / week
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Over {showResult ? weeksLeft : 0} {weeksLeft === 1 ? "week" : "weeks"} remaining
            </p>

            <div className="border-t pt-4 mt-4 text-sm text-gray-700 space-y-2">
              <p><span className="font-medium">Goal:</span> {goalType || "--"}</p>
              <p><span className="font-medium">Target:</span> ${showResult ? parsedTarget.toFixed(2) : '0.00'}</p>
              <p><span className="font-medium">Already saved:</span> ${showResult ? parsedSaved.toFixed(2) : '0.00'}</p>
              <p><span className="font-medium">Remaining:</span> ${showResult ? remaining.toFixed(2) : '0.00'}</p>
              <p><span className="font-medium">Interest (5%):</span> ${showResult ? interest.toFixed(2) : '0.00'}</p>
              <p className="font-semibold border-t pt-2">
                Total (savings + interest): ${showResult ? totalWithInterest.toFixed(2) : '0.00'}
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
        <button
        onClick={() => navigate('/register')}
        className="bg-blue-300 hover:bg-blue-400 text-gray-800 font-semibold px-6 py-2 rounded shadow transition"
      >
        Open an account
      </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
