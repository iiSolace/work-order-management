<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useChart } from '@/composables/useChart'
import type { WorkOrder } from '@/types/workOrder'

const props = defineProps<{
  dataSource: Array<{
    project: string
    hours: number
  }>
  activeWorkOrder: WorkOrder | null
}>()

const chartData = computed(() => props.dataSource)
const chart = useChart(() => chartData.value, () => props.activeWorkOrder)

onMounted(() => {
  chart.initChart()
})
</script>

<template>
  <div class="chart-card">
    <div class="chart-card__head">
      <div class="chart-card__title">Project Hours Distribution</div>
      <div v-if="activeWorkOrder" class="chart-card__hint">
        当前项目：{{ activeWorkOrder.project }} / 当前工单 {{ activeWorkOrder.hours }}h
      </div>
      <div v-else class="chart-card__hint">鼠标悬停表格行以高亮对应柱状图</div>
    </div>
    <div :ref="chart.setChartRef" class="chart-card__canvas" />
  </div>
</template>

<style scoped lang="less">
.chart-card {
  background: #fff;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 18px 45px rgba(31, 56, 88, 0.08);
}

.chart-card__title {
  font-size: 18px;
  font-weight: 600;
}

.chart-card__head {
  margin-bottom: 16px;
}

.chart-card__hint {
  color: #5b6b82;
  font-size: 13px;
  margin-top: 6px;
}

.chart-card__canvas {
  height: 360px;
}
</style>
