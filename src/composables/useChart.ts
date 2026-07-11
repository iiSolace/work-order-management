import { onBeforeUnmount, ref, watch } from 'vue'
import { BarChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { type ECharts, init, use } from 'echarts/core'
import type { WorkOrder } from '@/types/workOrder'

use([BarChart, GridComponent, TooltipComponent, CanvasRenderer])

interface ChartItem {
  project: string
  hours: number
}

export function useChart(
  dataSource: () => ChartItem[],
  activeWorkOrder?: () => WorkOrder | null,
) {
  const chartRef = ref<HTMLElement | null>(null)
  let chart: ECharts | null = null

  function setChartRef(element: Element | { $el?: Element } | null) {
    const target =
      element instanceof HTMLElement
        ? element
        : element && '$el' in element
          ? element.$el
          : null
    chartRef.value = target instanceof HTMLElement ? target : null
  }

  function renderChart() {
    if (!chartRef.value) {
      return
    }

    chart ??= init(chartRef.value)
    const data = dataSource()
    const activeProject = activeWorkOrder?.()?.project
    chart.setOption({
      tooltip: { trigger: 'axis' },
      grid: { left: 40, right: 16, top: 32, bottom: 84 },
      xAxis: {
        type: 'category',
        data: data.map((item) => item.project),
        axisTick: { alignWithLabel: true },
        axisLabel: {
          interval: 0,
          rotate: 18,
          hideOverlap: false,
        },
      },
      yAxis: { type: 'value', name: 'Hours' },
      series: [
        {
          type: 'bar',
          data: data.map((item) => ({
            value: item.hours,
            itemStyle: {
              color: item.project === activeProject ? '#fa8c16' : '#1677ff',
              borderRadius: [8, 8, 0, 0],
              opacity: activeProject && item.project !== activeProject ? 0.45 : 1,
            },
          })),
          barMaxWidth: 48,
          label: activeProject
            ? {
                show: true,
                position: 'top',
                formatter: ({ dataIndex }: { dataIndex: number }) => {
                  const current = data[dataIndex]
                  return current.project === activeProject ? `${current.hours}h` : ''
                },
                color: '#d46b08',
                fontWeight: 600,
              }
            : { show: false },
        },
      ],
    })
  }

  function resizeChart() {
    chart?.resize()
  }

  watch([dataSource, () => activeWorkOrder?.()], renderChart, { deep: true })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeChart)
    chart?.dispose()
    chart = null
  })

  function initChart() {
    renderChart()
    window.addEventListener('resize', resizeChart)
  }

  return {
    chartRef,
    initChart,
    setChartRef,
  }
}
