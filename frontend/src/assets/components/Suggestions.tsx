import React from 'react';
import { useGoals } from '../context/GoalsContext';

const Suggestions: React.FC = () => {
  const { goals, contributions } = useGoals();

  const calculateSuggestions = () => {
    const today = new Date();
    const messages: string[] = [];

    goals.forEach((goal) => {
      const totalSaved = contributions
        .filter((c) => c.goalName === goal.name)
        .reduce((sum, c) => sum + parseFloat(c.amount), 0);

      const remainingAmount = parseFloat(goal.target) - totalSaved;

      const deadline = new Date(goal.deadline);
      const timeDiff = deadline.getTime() - today.getTime();
      const weeksRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24 * 7));

      if (weeksRemaining > 0 && remainingAmount > 0) {
        const suggested = (remainingAmount / weeksRemaining).toFixed(2);
        messages.push(`💡 Para la meta "${goal.name}", deberías ahorrar $${suggested} por semana para llegar a tiempo.`);
      } else if (weeksRemaining <= 0 && remainingAmount > 0) {
        messages.push(`⚠️ La meta "${goal.name}" está vencida y aún no se ha completado.`);
      }
    });

    if (messages.length === 0) {
      messages.push('✅ ¡Todo en orden! No tienes sugerencias pendientes.');
    }

    return messages;
  };

  const suggestions = calculateSuggestions();

  return (
    <div className="bg-white p-6 rounded shadow border">
      <h2 className="text-xl font-bold text-blue-900 mb-4">Sugerencias</h2>
      <ul className="text-sm text-gray-700 space-y-2">
        {suggestions.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default Suggestions;
