// GoalCard.tsx
import React,{useState,useEffect} from 'react';
import { differenceInWeeks, isAfter, parseISO } from 'date-fns';

interface Goal {
  name: string;
  category: string;
  target: string;
  deadline: string;
}

interface Contribution {
  goalName: string;
  amount: string;
}

interface GoalCardProps {
  goal: Goal;
  contributions?: Contribution[];
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, contributions = [] }) => {
  const totalSaved = contributions
    .filter((c) => c.goalName === goal.name)
    .reduce((sum, c) => sum + parseFloat(c.amount), 0);

  const targetAmount = parseFloat(goal.target);
  const progress = Math.min((totalSaved / targetAmount) * 100, 100);

  const today = new Date();
  const deadline = parseISO(goal.deadline);
  const weeksRemaining = Math.max(differenceInWeeks(deadline, today), 1);
  const remainingAmount = targetAmount - totalSaved;
  const recommendedWeekly = remainingAmount / weeksRemaining;

  const originalWeekly = targetAmount / (differenceInWeeks(deadline, today) + Math.ceil(totalSaved / (targetAmount / weeksRemaining)));
  const isAtRisk = recommendedWeekly > originalWeekly * 2;
  const isExpired = isAfter(today, deadline) && progress < 100;

  let barColor = 'bg-blue-500';
  if (progress >= 100) barColor = 'bg-blue-500';
  else if (recommendedWeekly > originalWeekly * 2) barColor = 'bg-red-500';
  else if (recommendedWeekly > originalWeekly) barColor = 'bg-yellow-400';
  else barColor = 'bg-green-400';

  
const getId = (): number | null => {
  const loginData = localStorage.getItem("user");

  if (loginData) {
    const parsedData = JSON.parse(loginData);

    if (parsedData && parsedData.personData && parsedData.personData.personId) {
      return parsedData.personData.personId;
    }
  }

  return null;
};

  return (
    <div className="bg-white rounded shadow p-4 border border-gray-200">
      <h3 className="text-lg font-semibold text-blue-900 mb-1">{goal.name}</h3>
      <p className="text-sm text-gray-500 mb-1">
        Objetivo: ${targetAmount.toFixed(2)} · Ahorrado: ${totalSaved.toFixed(2)}
      </p>
      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
        <div className={`h-3 rounded-full ${barColor}`} style={{ width: `${progress}%` }}></div>
      </div>
      <p className="text-xs text-gray-600 mb-1">Fecha límite: {goal.deadline}</p>
      {isAtRisk && <p className="text-xs text-red-600 font-medium">⚠️ Meta en riesgo: necesitas ahorrar más del doble del ritmo ideal.</p>}
      {isExpired && <p className="text-xs text-gray-500 font-medium">📅 Meta vencida</p>}
    </div>
  );
};

export default GoalCard;