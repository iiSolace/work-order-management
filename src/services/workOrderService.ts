import { api } from './api'
import type { WorkOrder, WorkOrderResponse } from '@/types/workOrder'

export const workOrderService = {
  async getWorkOrders() {
    const { data } = await api.get<WorkOrderResponse>('/mockData.json')
    return data.workOrders.map<WorkOrder>((item) => ({
      id: item.id,
      project: item.project,
      overtime: item.overtime,
      hours: item.hours,
      createdAt: item.created_at,
    }))
  },
  async deleteWorkOrder(id: string) {
    return Promise.resolve({ success: true, removedId: id })
  },
}
