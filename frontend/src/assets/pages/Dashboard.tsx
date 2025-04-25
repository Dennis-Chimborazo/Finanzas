import React from 'react';
import Sidebar from '../components/Sidebar';
import GoalCard from '../components/GoalCard';
import GoalProgress from '../components/GoalProgress';
import Suggestions from '../components/Suggestions';
import AddContribution from '../components/AddContribution';
import BalanceCard from '../components/BalanceCard';
import { useGoals } from '../context/GoalsContext';


const Dashboard: React.FC = () => {
  const { goals, contributions, getGoalContributions } = useGoals();

  // Calcular total acumulado
  const totalContributions = contributions.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
  
  

  return (
    <div className="min-h-screen flex bg-[#F9FAFB]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 lg:p-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-blue-900">¡Bienvenido de nuevo!</h1>
            <p className="text-sm text-gray-500">Aquí tienes un resumen de tus metas de ahorro.</p>
          </div>
          <img
            src="/images/banner.png"
            alt="Logo"
            className="h-25 w-auto drop-shadow-lg"
          />
        </div>

        {/* Balance Card */}
        <div className="mb-8 max-w-xs">
          <BalanceCard balance={totalContributions} />
        </div>

        {/* Section: Goals Overview */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {goals.length === 0 ? (
            <>
            <p className="text-gray-600 col-span-full">Aún no has creado metas.</p>
            </>
          ) : (
            goals.map((goal, index) => {
              const goalContributions = contributions.filter(c => c.goalName === goal.name);
              return (
                <GoalCard
                  key={index}
                  goal={goal}
                  contributions={goalContributions}
                />
              );
            })
          )}
        </section>

        {/* Section: Progress and Suggestions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2">
            <GoalProgress />
          </div>
          <Suggestions />
        </div>

        {/* Section: Add Contribution */}
        <div className="max-w-3xl">
          <AddContribution />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;