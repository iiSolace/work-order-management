<script setup lang="ts">
import { formatDate } from '@/utils/helpers'
import type { WorkOrder } from '@/types/workOrder'

defineProps<{
  loading: boolean
  isAdmin: boolean
  dataSource: WorkOrder[]
  columns: Array<Record<string, unknown>>
}>()

const emit = defineEmits<{
  delete: [id: string]
  rowHover: [record: WorkOrder]
  rowLeave: []
}>()

function getCustomRow(record: WorkOrder) {
  return {
    onMouseenter: () => emit('rowHover', record),
    onMouseleave: () => emit('rowLeave'),
  }
}
</script>

<template>
  <a-table
    :columns="columns"
    :custom-row="getCustomRow"
    :data-source="dataSource"
    :loading="loading"
    :pagination="{ pageSize: 6 }"
    row-key="id"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'createdAt'">
        {{ formatDate(record.createdAt) }}
      </template>
      <template v-else-if="column.key === 'overtime'">
        {{ record.overtime ? 'Yes' : 'No' }}
      </template>
      <template v-else-if="column.key === 'action'">
        <a-button v-if="isAdmin" danger size="small" @click="emit('delete', record.id)">
          删除
        </a-button>
      </template>
    </template>
  </a-table>
</template>
