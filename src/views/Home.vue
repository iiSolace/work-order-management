<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import WorkOrderTable from '@/components/WorkOrderTable.vue'
import { useWorkOrder } from '@/composables/useWorkOrder'
import { useUserStore } from '@/stores/user'
import { createWorkOrderColumns } from '@/utils/tableColumns'
import type { WorkOrder } from '@/types/workOrder'

const router = useRouter()
const userStore = useUserStore()
const { items, loading, totalHoursByProject, loadData, deleteById } = useWorkOrder()
const HoursChart = defineAsyncComponent(() => import('@/components/HoursChart.vue'))
const activeWorkOrder = ref<WorkOrder | null>(null)

const columns = computed(() => createWorkOrderColumns(userStore.isAdmin))

async function handleDelete(id: string) {
  await deleteById(id)
}

function handleLogout() {
  userStore.logout()
  message.info('已退出登录')
  router.push('/')
}

function handleRowHover(record: WorkOrder) {
  activeWorkOrder.value = record
}

function handleRowLeave() {
  activeWorkOrder.value = null
}

onMounted(async () => {
  try {
    await loadData()
  } catch {
    message.error('加载工单失败，请刷新或稍后重试')
  }
})
</script>

<template>
  <div class="home-page">
    <header class="home-page__header">
      <div>
        <div class="home-page__title">工单总览</div>
        <div class="home-page__subtitle">
          当前用户：{{ userStore.user?.username }} / {{ userStore.isAdmin ? '管理员' : '普通用户' }}
        </div>
      </div>
      <a-button size="large" @click="handleLogout">退出登录</a-button>
    </header>

    <section class="home-page__content">
      <div class="home-page__table">
        <div class="section-title">工单列表</div>
        <WorkOrderTable
          :columns="columns"
          :data-source="items"
          :is-admin="userStore.isAdmin"
          :loading="loading"
          @delete="handleDelete"
          @row-hover="handleRowHover"
          @row-leave="handleRowLeave"
        />
      </div>
      <HoursChart :active-work-order="activeWorkOrder" :data-source="totalHoursByProject" />
    </section>
  </div>
</template>
