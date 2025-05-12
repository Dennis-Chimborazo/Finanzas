import React from 'react';
import Sidebar from '../components/Sidebar';
import { useGoals } from '../context/GoalsContext';

const Suggestions: React.FC = () => {
  const { goals, contributions } = useGoals();

  const today = new Date();
  const generateSuggestions = () => {
    const messages: string[] = [];

    goals.forEach((goal) => {
      const totalSaved = contributions
        .filter((c) => c.goalName === goal.name)
        .reduce((sum, c) => sum + parseFloat(c.amount), 0);

      const remainingAmount = parseFloat(goal.target) - totalSaved;
      const deadline = new Date(goal.deadline);
      const daysRemaining = (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
      const weeksRemaining = Math.max(Math.ceil(daysRemaining / 7), 1);

      if (remainingAmount > 0) {
        const suggestedWeekly = (remainingAmount / weeksRemaining).toFixed(2);
        messages.push(`💡 Para la meta "${goal.name}", deberías ahorrar $${suggestedWeekly} semanales para alcanzar tu objetivo a tiempo.`);

        if (daysRemaining < 7) {
          messages.push(`⚠️ La meta "${goal.name}" está muy cerca de la fecha límite. ¡Actúa pronto!`);
        }
      } else {
        messages.push(`✅ ¡Felicidades! Has alcanzado tu meta "${goal.name}".`);
      }
    });

    return messages.length > 0 ? messages : ['No tienes metas activas con aportes pendientes.'];
  };

  const suggestions = generateSuggestions();

  return (
    <div className="min-h-screen flex bg-[#F9FAFB]">
      <Sidebar />

      <main className="flex-1 px-6 md:px-10 py-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-1">💡 Sugerencias de Ahorro</h2>
            <p className="text-sm text-gray-600">Optimiza tu planificación financiera con estas recomendaciones automáticas.</p>
          </div>
          <img src="/images/banner.png" alt="Ilustración" className="w-28 md:w-36 hidden md:block" />
        </div>

        <section className="bg-white rounded-lg shadow-md border border-blue-100 p-6 max-w-4xl mx-auto">
          <p className="text-gray-700 text-sm mb-4">
            Estas sugerencias se calculan en función de tu ritmo actual de ahorro y la fecha límite establecida en tus metas.
          </p>

          <ul className="space-y-4 text-gray-800 text-sm list-disc pl-5">
            {suggestions.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Suggestions;
