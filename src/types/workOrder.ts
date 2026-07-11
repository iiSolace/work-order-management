export interface WorkOrder {
  id: string
  project: string
  overtime: boolean
  hours: number
  createdAt: string
}

export interface WorkOrderResponseItem {
  id: string
  project: string
  overtime: boolean
  hours: number
  created_at: string
}

export interface WorkOrderResponse {
  workOrders: WorkOrderResponseItem[]
}

export interface UserInfo {
  username: string
  role: 'admin' | 'user'
}
