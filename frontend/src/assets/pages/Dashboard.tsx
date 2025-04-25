import React, {useEffect,useState} from 'react';
import Sidebar from '../components/Sidebar';
import GoalCard from '../components/GoalCard';
import GoalProgress from '../components/GoalProgress';
import Suggestions from '../components/Suggestions';
import AddContribution from '../components/AddContribution';
import BalanceCard from '../components/BalanceCard';
import { useGoals } from '../context/GoalsContext';
import DataTable from "react-data-table-component";
import ApiService from "../service/ApiService";


const Dashboard: React.FC = () => {
  const { goals, contributions, getGoalContributions } = useGoals();
  
  interface Meta {
    goal_id: number;
    goal_name: string;
    accountNumber: string;
    accountType: string;
    current_balance: string;
    status: string;
    avance: number;
  }
  const [metas, setMetas] = useState<Meta[]>([]);

  interface GoalRow {
    goal_id: number;
    goal_name: string;
    accountNumber: string;
    accountType: string;
    current_balance: string;
    status: string;
    avance: number;
  }
  useEffect(() => {
    const cargarDatos = async () => {
      const mant = await ApiService.search("user", '3');
      setMetas(mant); // ✅ ya matchea el tipo
    };
    cargarDatos();
  }, []);
  


  const columnas: {
    name: string;
    selector: (row: GoalRow) => string | number;
  }[] = [
    { name: "Número de cuenta", selector: (row) => row.accountNumber },
    { name: "Tipo de cuenta", selector: (row) => row.accountType },
    { name: "Nombre del objetivo", selector: (row) => row.goal_name },
    { name: "Estado", selector: (row) => row.status },
    { name: "Saldo", selector: (row) => row.current_balance },
  ];
  

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
        <DataTable
          pagination
          paginationPerPage={10}
          columns={columnas}
          data={metas}
          noDataComponent="No Metas creadas"
          persistTableHead>
        </DataTable>
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