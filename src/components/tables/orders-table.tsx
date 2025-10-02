import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Pencil, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import axios from "axios"
import { apiOrderService, apiHistory } from "@/service/api"

type ServiceOrder = {
  id: string
  descriptionOfTheProblem: string
  location: string
  priority: "BAIXA" | "MEDIA" | "ALTA"
  statusOrder: "ABERTA" | "EM_ANDAMENTO" | "CONCLUIDA" | "CANCELADA"
  creationDate: string
  completionDate?: string | null
  teamID: string
}

const ServicesTable = () => {
  const [serviceOrders, setServiceOrders] = useState<ServiceOrder[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<ServiceOrder | null>(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [statusUpdateInfo, setStatusUpdateInfo] = useState<{ orderId: string; newStatus: ServiceOrder['statusOrder'] } | null>(null);
  const [appliedSolution, setAppliedSolution] = useState("");

  const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    const headers: { [key: string]: string } = { 'ngrok-skip-browser-warning': 'true' };
    if (token) {
      headers.Authorization = token;
    }
    return { headers };
  }; 

  const fetchServiceOrders = async () => {
    setIsLoading(true)
    try {
      const response = await apiOrderService.get<ServiceOrder[]>("/service-orders/findAll", getAuthConfig());
      setServiceOrders(response.data)
    } catch (err) {
      console.error("Falha ao buscar ordens de serviço:", err)
      setServiceOrders([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchServiceOrders()
  }, [])

  const openDeleteModal = (order: ServiceOrder) => {
    setOrderToDelete(order);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setOrderToDelete(null);
    setIsDeleteModalOpen(false);
  };
  
  const handleConfirmDelete = async () => {
    if (!orderToDelete) return;
    try {
      await apiOrderService.delete(`/service-orders/delete/${orderToDelete.id}`, getAuthConfig());
      setServiceOrders(prevOrders => prevOrders.filter(order => order.id !== orderToDelete.id));
      closeDeleteModal();
    } catch (err) {
      alert(axios.isAxiosError(err) ? err.response?.data?.message || "Erro ao deletar." : "Ocorreu um erro inesperado.");
      console.error(err)
    }
  }
  
  const handleEdit = (order: ServiceOrder) => {
    console.log("Editar:", order);
    alert("Funcionalidade de edição a ser implementada. Ver console.");
  }

  const handleStatusChange = (id: string, newStatus: ServiceOrder['statusOrder']) => {
    setStatusUpdateInfo({ orderId: id, newStatus });
    setIsStatusModalOpen(true);
  };

  const handleConfirmStatusUpdate = async () => {
    if (!statusUpdateInfo || !appliedSolution) {
        alert("Por favor, preencha a solução aplicada.");
        return;
    }

    const { orderId, newStatus } = statusUpdateInfo;

    try {
        await apiOrderService.patch(
            `/service-orders/update-status/${orderId}`,
            { 
                statusOrder: newStatus,
                appliedSolution: appliedSolution
            },
            getAuthConfig()
        );
        await apiHistory.get(
            `/history/save`,
            getAuthConfig()
        );
        
        setServiceOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === orderId ? { ...order, statusOrder: newStatus } : order
            )
        );
        closeStatusModal();
    } catch (err) {
        alert("Não foi possível atualizar o status.");
        console.error(err);
    }
  };

  const closeStatusModal = () => {
    setIsStatusModalOpen(false);
    setAppliedSolution("");
    setStatusUpdateInfo(null);
  };
  
  const handlePriorityChange = async (id: string, newPriority: ServiceOrder['priority']) => {
    const orderToUpdate = serviceOrders.find(order => order.id === id);
    if (!orderToUpdate) return;
    const updatedOrder = { ...orderToUpdate, priority: newPriority };
    try {
      await apiOrderService.put(`/service-orders/update/${id}`, updatedOrder, getAuthConfig());
      setServiceOrders(prevOrders => prevOrders.map(order => order.id === id ? { ...order, priority: newPriority } : order));
    } catch (err) {
      alert("Não foi possível atualizar a prioridade.");
      console.error(err);
      fetchServiceOrders();
    }
  };

  if (isLoading) {
    return <div className="p-4 text-center">Carregando...</div>
  }

  return (
    <>
      <div className="p-4 border rounded-lg shadow-md">
        <Table>
          <TableHeader>
             <TableRow>
               <TableHead>ID</TableHead>
               <TableHead>Descrição</TableHead>
               <TableHead>Localização</TableHead>
               <TableHead>Prioridade</TableHead>
               <TableHead>Status</TableHead>
               <TableHead>Data de Criação</TableHead>
               <TableHead>Equipe</TableHead>
               <TableHead className="text-right">Ações</TableHead>
             </TableRow>
           </TableHeader>
          <TableBody>
            {serviceOrders.length === 0 ? (
              <TableRow><TableCell colSpan={8} className="text-center text-muted-foreground">Não há dados cadastrados.</TableCell></TableRow>
            ) : (
              serviceOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell className="text-blue-600 underline cursor-pointer">{order.descriptionOfTheProblem}</TableCell>
                  <TableCell>{order.location}</TableCell>
                  <TableCell>
                    <select value={order.priority} onChange={(e) => handlePriorityChange(order.id, e.target.value as ServiceOrder['priority'])} className="p-2 border rounded-md bg-transparent">
                      <option value="BAIXA">Baixa</option>
                      <option value="MEDIA">Média</option>
                      <option value="ALTA">Alta</option>
                    </select>
                  </TableCell>
                  <TableCell>
                    <select 
                      value={order.statusOrder} 
                      onChange={(e) => {
                        handleStatusChange(order.id, e.target.value as ServiceOrder['statusOrder']);
                        e.target.value = order.statusOrder;
                      }} 
                      className="p-2 border rounded-md bg-transparent"
                    >
                      <option value="ABERTA">Aberta</option>
                      <option value="EM_ANDAMENTO">Em Andamento</option>
                      <option value="CONCLUIDA">Concluída</option>
                      <option value="CANCELADA">Cancelada</option>
                    </select>
                  </TableCell>
                  <TableCell>{new Date(order.creationDate).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell>{order.teamID}</TableCell>
                  <TableCell className="flex gap-2 justify-end">
                    <button onClick={() => openDeleteModal(order)} className="p-1 hover:bg-gray-100 rounded"><Trash2 className="h-4 w-4 text-red-600" /></button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {isDeleteModalOpen && orderToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="relative bg-white w-full max-w-md p-8 rounded-xl shadow-2xl text-center">
            <h2 className="text-3xl font-bold text-red-600 mb-4">Deletar Serviço</h2>
            <p className="text-lg font-semibold text-gray-800 mb-2">"{orderToDelete.descriptionOfTheProblem}"</p>
            <p className="text-gray-600 mb-8">Tem certeza que deseja excluir esta ordem de serviço?</p>
            <div className="flex justify-center gap-6">
              <button onClick={closeDeleteModal} className="px-8 py-3 bg-gray-200 text-gray-800 font-bold rounded-lg transition-colors hover:bg-gray-300">
                Cancelar
              </button>
              <button onClick={handleConfirmDelete} className="px-8 py-3 bg-red-600 text-white font-bold rounded-lg transition-colors hover:bg-red-700">
                Deletar
              </button>
            </div>
          </div>
        </div>
      )}

      {isStatusModalOpen && statusUpdateInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white w-full max-w-lg p-8 rounded-xl shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Atualizar Status do Serviço</h2>
            <p className="mb-6">Você está alterando o status para: <strong className="font-semibold">{statusUpdateInfo.newStatus}</strong></p>
            
            <label htmlFor="solution" className="block text-sm font-medium text-gray-700">Solução Aplicada / Motivo</label>
            <textarea
              id="solution"
              value={appliedSolution}
              onChange={(e) => setAppliedSolution(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
              placeholder="Descreva a solução aplicada ou o motivo da alteração..."
            />
            
            <div className="flex justify-end gap-4 mt-8">
              <button onClick={closeStatusModal} className="px-6 py-2 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300">
                Cancelar
              </button>
              <button onClick={handleConfirmStatusUpdate} className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ServicesTable