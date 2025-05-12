// src/assets/components/BalanceCard.tsx
import React, { useState } from 'react';

interface BalanceCardProps {
  balance: number;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ balance }) => {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div className="bg-white rounded-lg p-6 shadow text-blue-900">
      <h3 className="text-sm font-semibold mb-2">Available Balance</h3>
      <div className="text-3xl font-bold">
        {showBalance ? `$ ${balance.toFixed(2)}` : '****.**'}
      </div>
      <button
        onClick={() => setShowBalance(!showBalance)}
        className="text-sm text-blue-600 mt-2 hover:underline"
      >
        {showBalance ? 'Hide balance' : 'Show balance'}
      </button>
    </div>
  );
};

export default BalanceCard;
