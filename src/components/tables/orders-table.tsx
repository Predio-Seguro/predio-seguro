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
import { apiOrderService } from "@/service/api"

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

  // Função auxiliar para criar a configuração do header com o token
  const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    if (token) {
      return {
        headers: {
          Authorization: token,
        },
      };
    }
    return {};
  };

  const fetchServiceOrders = async () => {
    setIsLoading(true)
    try {
      const response = await apiOrderService.get<ServiceOrder[]>(
        "/service-orders/findAll",
        getAuthConfig() // Adiciona o header na requisição
      );
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
      await apiOrderService.delete(
        `/service-orders/delete/${orderToDelete.id}`,
        getAuthConfig() // Adiciona o header na requisição
      );
      setServiceOrders(prevOrders => prevOrders.filter(order => order.id !== orderToDelete.id));
      closeDeleteModal();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "Não foi possível deletar a ordem de serviço.")
      } else {
        alert("Ocorreu um erro inesperado.")
      }
      console.error(err)
    }
  }
  
  const handleEdit = (order: ServiceOrder) => {
    console.log("Editar:", order)
    alert("Funcionalidade de edição a ser implementada. Ver console.")
  }

  const handleStatusChange = async (id: string, newStatus: ServiceOrder['statusOrder']) => {
    try {
      await apiOrderService.patch(
        `/service-orders/update-status/${id}`,
        { statusOrder: newStatus },
        getAuthConfig() // Adiciona o header na requisição
      );
      setServiceOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === id ? { ...order, statusOrder: newStatus } : order
        )
      );
    } catch (err) {
      alert("Não foi possível atualizar o status.");
      console.error(err);
      fetchServiceOrders();
    }
  };

  const handlePriorityChange = async (id: string, newPriority: ServiceOrder['priority']) => {
    const orderToUpdate = serviceOrders.find(order => order.id === id);
    if (!orderToUpdate) return;
    
    const updatedOrder = { ...orderToUpdate, priority: newPriority };

    try {
      await apiOrderService.put(
        `/service-orders/update/${id}`,
        updatedOrder,
        getAuthConfig() // Adiciona o header na requisição
      );
      setServiceOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === id ? { ...order, priority: newPriority } : order
        )
      );
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
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground">
                  Não há dados cadastrados.
                </TableCell>
              </TableRow>
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
                    <select value={order.statusOrder} onChange={(e) => handleStatusChange(order.id, e.target.value as ServiceOrder['statusOrder'])} className="p-2 border rounded-md bg-transparent">
                      <option value="ABERTA">Aberta</option>
                      <option value="EM_ANDAMENTO">Em Andamento</option>
                      <option value="CONCLUIDA">Concluída</option>
                      <option value="CANCELADA">Cancelada</option>
                    </select>
                  </TableCell>
                  <TableCell>{new Date(order.creationDate).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell>{order.teamID}</TableCell>
                  <TableCell className="flex gap-2 justify-end">
                    <button onClick={() => handleEdit(order)} className="p-1 hover:bg-gray-100 rounded">
                      <Pencil className="h-4 w-4 text-blue-600" />
                    </button>
                    <button onClick={() => openDeleteModal(order)} className="p-1 hover:bg-gray-100 rounded">
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>
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
    </>
  )
}

export default ServicesTable