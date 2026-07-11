import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { workOrderService } from '@/services/workOrderService'
import type { WorkOrder } from '@/types/workOrder'

export const useWorkOrderStore = defineStore('workOrder', () => {
  const items = ref<WorkOrder[]>([])
  const loading = ref(false)

  const totalHoursByProject = computed(() => {
    const grouped = items.value.reduce<Record<string, number>>((acc, item) => {
      acc[item.project] = (acc[item.project] ?? 0) + item.hours
      return acc
    }, {})

    return Object.entries(grouped).map(([project, hours]) => ({ project, hours }))
  })

  async function fetchWorkOrders() {
    loading.value = true
    try {
      items.value = await workOrderService.getWorkOrders()
    } finally {
      loading.value = false
    }
  }

  async function removeWorkOrder(id: string) {
    await workOrderService.deleteWorkOrder(id)
    items.value = items.value.filter((item) => item.id !== id)
  }

  return {
    items,
    loading,
    totalHoursByProject,
    fetchWorkOrders,
    removeWorkOrder,
  }
})
