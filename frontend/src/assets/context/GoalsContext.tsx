import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import ApiService from "../service/ApiService";


interface Goal {
  name: string;
  category: string;
  target: string;
  deadline: string;
  createdAt?: string;
}

interface Contribution {
  goalName: string;
  amount: string;
  date: string;
}

interface GoalsContextProps {
  goals: Goal[];
  contributions: Contribution[];
  addGoal: (goal: Goal) => void;
  addContribution: (contribution: Contribution) => void;
  totalBalance: () => number;
  getGoalContributions: (goalName: string) => number;
  getLastContributionDate: (goalName: string) => string | null;
  getWeeksRemaining: (deadline: string) => number;
  getWeeklyRecommendation: (goalName: string) => number;
}

const GoalsContext = createContext<GoalsContextProps | undefined>(undefined);

export const GoalsProvider = ({ children }: { children: ReactNode }) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [contributions, setContributions] = useState<Contribution[]>([]);

  const addGoal = (goal: Goal) => {
    const goalWithDate = { ...goal, createdAt: new Date().toISOString() };
    setGoals((prev) => [...prev, goalWithDate]);
  };

  const addContribution = (contribution: Contribution) => {
    const contributionWithDate = {
      ...contribution,
      date: new Date().toISOString(),
    };
    setContributions((prev) => [...prev, contributionWithDate]);
  };

  const totalBalance = () => {
    return contributions.reduce((acc, c) => acc + parseFloat(c.amount), 0);
  };

  const getGoalContributions = (goalName: string) => {
    return contributions
      .filter((c) => c.goalName === goalName)
      .reduce((acc, c) => acc + parseFloat(c.amount), 0);
  };

  const getLastContributionDate = (goalName: string): string | null => {
    const contribs = contributions
      .filter((c) => c.goalName === goalName)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return contribs.length > 0 ? contribs[0].date : null;
  };

  const getWeeksRemaining = (deadline: string): number => {
    const today = new Date();
    const endDate = new Date(deadline);
    const diff = endDate.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24 * 7));
  };

  const getWeeklyRecommendation = (goalName: string): number => {
    const goal = goals.find((g) => g.name === goalName);
    if (!goal) return 0;
    const total = parseFloat(goal.target);
    const saved = getGoalContributions(goalName);
    const remaining = total - saved;
    const weeks = getWeeksRemaining(goal.deadline);
    return weeks > 0 ? +(remaining / weeks).toFixed(2) : remaining;
  };



useEffect(() => {
  const fetchGoals = async () => {
    if (goals.length === 0 && contributions.length === 0) {
      try {
        const response = await ApiService.search("user", '3');
    console.log(response)


        const apiGoals: Goal[] = response.map((item: any) => ({
          name: item.goal_name,
          category: 'meta',
          target: '5000', // o item.target si existe
          deadline: '2025-12-31',
          createdAt: new Date().toISOString()
        }));

        const apiContributions: Contribution[] = response.map((item: any) => ({
          goalName: item.goal_name,
          amount: item.current_balance,
          date: new Date().toISOString()
        }));

        setGoals(apiGoals);
        setContributions(apiContributions);
      } catch (error) {
        console.error('Error fetching goals from API:', error);
      }
    }
  };

  fetchGoals();
}, []);
  return (
    <GoalsContext.Provider
      value={{
        goals,
        contributions,
        addGoal,
        addContribution,
        totalBalance,
        getGoalContributions,
        getLastContributionDate,
        getWeeksRemaining,
        getWeeklyRecommendation,
      }}
    >
      {children}
    </GoalsContext.Provider>
  );
};

export const useGoals = () => {
  const context = useContext(GoalsContext);
  if (!context) throw new Error('useGoals must be used within a GoalsProvider');
  return context;
};
