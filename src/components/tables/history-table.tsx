import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { apiHistory } from "@/service/api";
import axios from "axios";

type HistoryRecord = {
  id: string;
  description_of_the_problem: string;
  applied_solution: string;
  team_id: string;
  time_spent: number;
  conclusion_date: string;
};

const HistoryTable = () => {
  const [historyRecords, setHistoryRecords] = useState<HistoryRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [teamFilter, setTeamFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const getAuthConfig = () => {
  const token = localStorage.getItem('token');
  
  const headers: { [key: string]: string } = {
    // Este header instrui o Ngrok a pular a tela de aviso
    'ngrok-skip-browser-warning': 'true',
  };

  if (token) {
    headers.Authorization = token;
  }
  
  return { headers };
};  

  const fetchHistory = async (url = "/service-order") => {
    setIsLoading(true);
    try {
      const response = await apiHistory.get(url, getAuthConfig());
      console.log(response);
      
      // A verificação foi removida, definindo o estado diretamente com a resposta
      setHistoryRecords(response.data);
    } catch (err) {
      console.error("Falha ao buscar histórico:", err);
      setHistoryRecords([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);
  
  const handleFilter = () => {
    let filterUrl = "/service-order";

    if (teamFilter) {
      filterUrl = `/service-order/equip/${teamFilter}`;
    } else if (locationFilter) {
      filterUrl = `/service-order/location/${locationFilter}`;
    } else if (dateFilter) {
      filterUrl = `/service-order/date/${dateFilter}`;
    }
    
    fetchHistory(filterUrl);
  };

  const clearFilters = () => {
    setTeamFilter("");
    setDateFilter("");
    setLocationFilter("");
    fetchHistory();
  };

  if (isLoading) {
    return <div className="p-8 text-center">Carregando histórico...</div>;
  }

  return (
    <div className="p-8">
      <div className="p-4 mb-6 bg-gray-50 border rounded-lg flex flex-wrap items-end gap-4">
        <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por Equipe</label>
            <input 
                type="text"
                placeholder="ID da equipe"
                value={teamFilter}
                onChange={(e) => setTeamFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
            />
        </div>
        <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por Localização</label>
            <input 
                type="text"
                placeholder="Local do serviço"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
            />
        </div>
        <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por Data</label>
            <input 
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
            />
        </div>
        <div className="flex gap-2">
            <button onClick={handleFilter} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Filtrar</button>
            <button onClick={clearFilters} className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700">Limpar</button>
        </div>
      </div>

      <div className="p-4 border rounded-lg shadow-md bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID do Histórico</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Solução Aplicada</TableHead>
              <TableHead>ID da Equipe</TableHead>
              <TableHead>Tempo Gasto (min)</TableHead>
              <TableHead>Data de Conclusão</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historyRecords.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                  Nenhum registro encontrado no histórico.
                </TableCell>
              </TableRow>
            ) : (
              historyRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-semibold">{record.id}</TableCell>
                  <TableCell>{record.description_of_the_problem}</TableCell>
                  <TableCell>{record.applied_solution}</TableCell>
                  <TableCell>{record.team_id}</TableCell>
                  <TableCell>{record.time_spent}</TableCell>
                  <TableCell>{new Date(record.conclusion_date).toLocaleDateString("pt-BR")}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default HistoryTable;