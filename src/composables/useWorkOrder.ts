import { storeToRefs } from 'pinia'
import { message } from 'ant-design-vue'
import { useWorkOrderStore } from '@/stores/workOrder'

export function useWorkOrder() {
  const workOrderStore = useWorkOrderStore()
  const { items, loading, totalHoursByProject } = storeToRefs(workOrderStore)

  async function loadData() {
    try {
      await workOrderStore.fetchWorkOrders()
    } catch (error) {
      message.error('工单加载失败，请稍后重试')
      throw error
    }
  }

  async function deleteById(id: string) {
    try {
      await workOrderStore.removeWorkOrder(id)
      message.success('工单删除成功')
    } catch (error) {
      message.error('工单删除失败，请稍后重试')
      throw error
    }
  }

  return {
    items,
    loading,
    totalHoursByProject,
    loadData,
    deleteById,
  }
}
